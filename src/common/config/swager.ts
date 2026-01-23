import { DocumentBuilder } from "@nestjs/swagger";

export  const config = new DocumentBuilder()
    .setTitle('PRO HOME API')
    .setDescription('PRO HOME loyihasi uchun backend API hujjatlari')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
