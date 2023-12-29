import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';

@Injectable()
export class OptionalParseIntPipe implements PipeTransform<any> {
  async transform(
    value: string,
    metadata: ArgumentMetadata,
  ): Promise<number | undefined> {
    if (value === undefined) {
      return undefined;
    }

    const parseIntPipe = new ParseIntPipe();
    try {
      return await parseIntPipe.transform(value, metadata);
    } catch (error) {
      throw new BadRequestException('Validation failed: value is not a number');
    }
  }
}
