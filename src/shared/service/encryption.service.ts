import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
    private readonly algorithm = 'aes-256-gcm';
    private readonly key: Buffer;

    constructor(private config: ConfigService) {
        // Convert key to 32 bytes (required for AES-256)
        this.key = crypto
            .createHash('sha256')
            .update(config.get('API_KEY') || '')
            .digest();
    }

    encrypt(text: string): string {
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv(
            this.algorithm,
            this.key,
            iv,
        );

        const encrypted = Buffer.concat([
            cipher.update(text, 'utf8'),
            cipher.final(),
        ]);

        const tag = cipher.getAuthTag();

        // Store as single string: iv:tag:content
        return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
    }

    decrypt(data: string): string {
        const [ivHex, tagHex, contentHex] = data.split(':');

        const iv = Buffer.from(ivHex, 'hex');
        const tag = Buffer.from(tagHex, 'hex');
        const content = Buffer.from(contentHex, 'hex');

        const decipher = crypto.createDecipheriv(
            this.algorithm,
            this.key,
            iv,
        );

        decipher.setAuthTag(tag);

        const decrypted = Buffer.concat([
            decipher.update(content),
            decipher.final(),
        ]);

        return decrypted.toString('utf8');
    }
}