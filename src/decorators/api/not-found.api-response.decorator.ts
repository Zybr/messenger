import { ApiResponse, ApiResponseOptions } from "@nestjs/swagger";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";

/** Not found (404) response decorator */
const NotFoundApiResponse = (options?: ApiResponseOptions): MethodDecorator =>
  ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Objet was not found.",
    ...options,
  });

export default NotFoundApiResponse;
