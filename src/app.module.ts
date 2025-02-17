import * as dotenv from 'dotenv'
import { HttpStatus, Module } from '@nestjs/common'
import { GraphQLError } from 'graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { ContentModule } from 'src/content'
import { UserModule } from 'src/user'
import { CompanyModule } from 'src/company'
import { ApolloDriver } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'

dotenv.config()

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
      introspection: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      formatError: (error: GraphQLError) => {
        return {
          message: error.extensions?.originalError?.['message'],
          status_code:
            Number(error.extensions?.originalError?.['statusCode']) ||
            Number(error?.extensions?.code) ||
            HttpStatus.BAD_REQUEST,
          details: error?.extensions?.exception?.['details'] || error.extensions?.details,
        }
      },
    }),
    ContentModule,
    UserModule,
    CompanyModule,
  ],
})
export class AppModule {}
