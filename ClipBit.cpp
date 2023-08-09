#include "pxt.h"
#include "ClipBit.h"

namespace ClipBit {

    uint8_t data[129];

    //%
    void sendLogViaSerial()
    {
#if MICROBIT_CODAL
        int length = uBit.log.getDataLength(DataFormat::CSV);
        int blockSize = 128;
        int i = 0;

        while (length > 0)
        {
            memset(data, 0, 129);
            int l = min (blockSize, length);

            uBit.log.readData(data, i, l, DataFormat::CSV, length);
            uBit.serial.printf("%s", data);

            length = length - l;
            i = i + l;
        }
#endif
    }
}