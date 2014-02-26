#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdbool.h>
#include "files.h"

int main (int argc, char **argv) {
  unsigned short int flags = 0;
  char c;

  while ((c = getopt(argc, argv, "clmw")) != -1)
  {
    switch (c) {
      //number of multi-bytes
      case 'm': //0x01
        flags |= 0x01;
        flags &= ~0x02;
        break;

      //number of bytes
      case 'c': //0x02
        flags |= 0x02;
        flags &= ~0x01;
        break;

      //number of lines
      case 'l': //0x04
        flags |= 0x04;
        break;

      //number of words
      case 'w': //0x08
        flags |= 0x08;
        break;

      case '?':
        printf("usage: wc -wclm files..");

      default:
        return 1;
    }
  }

  

  return 0;
}
