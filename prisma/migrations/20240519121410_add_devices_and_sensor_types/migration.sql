-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "device_sn" TEXT NOT NULL,
    "device_name" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SensorType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SensorData" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "sensorTypeId" INTEGER NOT NULL,
    "port_number" INTEGER NOT NULL,
    "sensor_sn" TEXT NOT NULL,
    "sensor_name" TEXT NOT NULL,
    "units" TEXT NOT NULL,
    "depth" TEXT NOT NULL,

    CONSTRAINT "SensorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reading" (
    "id" SERIAL NOT NULL,
    "sensorDataId" INTEGER NOT NULL,
    "timestamp_utc" INTEGER NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "tz_offset" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "precision" INTEGER NOT NULL,
    "mrid" INTEGER NOT NULL,
    "error_flag" BOOLEAN NOT NULL,
    "error_description" TEXT,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_device_sn_key" ON "Device"("device_sn");

-- CreateIndex
CREATE UNIQUE INDEX "SensorType_name_key" ON "SensorType"("name");

-- AddForeignKey
ALTER TABLE "SensorData" ADD CONSTRAINT "SensorData_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorData" ADD CONSTRAINT "SensorData_sensorTypeId_fkey" FOREIGN KEY ("sensorTypeId") REFERENCES "SensorType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_sensorDataId_fkey" FOREIGN KEY ("sensorDataId") REFERENCES "SensorData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
