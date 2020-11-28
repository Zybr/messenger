import { ApiParam, ApiParamOptions } from "@nestjs/swagger";

const MessageIdApiParam = (options?: ApiParamOptions): MethodDecorator =>
  ApiParam({
    required: true,
    name: "id",
    description: "Message ID",
    schema: {
      type: "integer",
    },
    ...options,
  });

export default MessageIdApiParam;
