import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  try {
    logger.log('Starting NestJS application...');
    
    // Set a 10-second timeout for database connection
    const timeout = setTimeout(() => {
      logger.error('⏰ Database connection timeout after 10 seconds');
      logger.error('💡 Quick fixes:');
      logger.error('   - Run: ./scripts/start.sh (uses Docker)');
      logger.error('   - Or: docker-compose up -d');
      logger.error('   - Or: make sure PostgreSQL is running locally');
      process.exit(1);
    }, 10000);
    
    const app = await NestFactory.create(AppModule);
    
    // Clear the timeout if connection succeeds
    clearTimeout(timeout);

    // Enable CORS
    app.enableCors();

    // Global validation pipe
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // Swagger documentation setup
    const config = new DocumentBuilder()
      .setTitle('NestJS CRUD API')
      .setDescription('A complete CRUD API built with NestJS and PostgreSQL')
      .setVersion('1.0')
      .addTag('users')
      .addTag('posts')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port);
    
    logger.log(`✅ Application is running on: http://localhost:${port}`);
    logger.log(`📚 Swagger documentation: http://localhost:${port}/api`);
    logger.log(`🔗 Health check: http://localhost:${port}/health`);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error('❌ Failed to start application:', errorMessage);
    
    // Check if it's a database connection error
    if (errorMessage.includes('ECONNREFUSED') || 
        errorMessage.includes('ENOTFOUND') ||
        errorMessage.includes('connection') ||
        errorMessage.includes('database')) {
      
      logger.error('🔍 Database Connection Error Detected');
      logger.error('Please check the following:');
      logger.error('1. Is PostgreSQL running?');
      logger.error('2. Are the database credentials correct in .env file?');
      logger.error('3. Is the database host and port accessible?');
      logger.error('');
      logger.error('Environment variables:');
      logger.error(`   DATABASE_HOST: ${process.env.DATABASE_HOST || 'not set'}`);
      logger.error(`   DATABASE_PORT: ${process.env.DATABASE_PORT || 'not set'}`);
      logger.error(`   DATABASE_NAME: ${process.env.DATABASE_NAME || 'not set'}`);
      logger.error(`   DATABASE_USER: ${process.env.DATABASE_USER || 'not set'}`);
      logger.error('');
      logger.error('💡 Quick fixes:');
      logger.error('   - Run: ./scripts/start.sh (uses Docker)');
      logger.error('   - Or: docker-compose up -d');
      logger.error('   - Or: make sure PostgreSQL is running locally');
    }
    
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

bootstrap();
