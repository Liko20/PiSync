const {
  IsMongoId,
  IsDate,
  IsInt,
  Min,
  IsOptional,
} = require("class-validator");
const { validate } = require("class-validator");
class SyncEventDTO {
  @IsMongoId()
  device_id;

  @IsOptional()
  @IsDate()
  timestamp;

  @IsInt()
  @Min(0)
  total_files_synced;

  @IsInt()
  @Min(0)
  total_errors;

  @IsInt()
  @Min(0)
  internet_speed;

  constructor(data) {
    this.device_id = data.device_id;
    this.timestamp = data.timestamp ? new Date(data.timestamp) : undefined;
    this.total_files_synced = data.total_files_synced;
    this.total_errors = data.total_errors;
    this.internet_speed = data.internet_speed;
  }
}

export async function validateSyncEventInput(data) {
  const dto = new SyncEventDTO(data);
  const errors = await validate(dto);
  if (errors.length > 0) {
    throw new Error(" Validation failed : " + JSON.stringify(errors));
  }
  return dto;
}
