import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class UpdateUrlDto {
  @IsNotEmpty()
  @IsString()
  shortUrl: string

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  originalUrl: string
}
