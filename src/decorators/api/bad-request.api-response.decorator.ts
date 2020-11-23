import { ApiResponse, ApiResponseOptions } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";

/** Bad Request (400) response decorator */
const BadRequestApiResponse = (options?: ApiResponseOptions): MethodDecorator =>
  ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid request parameters.",
    ...options,
  });

export default BadRequestApiResponse;
