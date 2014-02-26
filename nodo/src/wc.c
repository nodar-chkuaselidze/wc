#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdbool.h>

#define usint unsigned short int
#define uint unsigned int

typedef struct files {
  char **list;
  int count;
} FILES;

int main (int argc, char **argv) {
  usint flags = 0;
  char c;

  FILES files;

  while ((c = getopt(argc, argv, "clmw")) != -1)
  {
    switch (c) {
      //number of multi-bytes - 0x01
      case 'm':
        flags |= 0x01;
        flags &= ~0x02;
        break;

      //number of bytes - 0x02
      case 'c':
        flags |= 0x02;
        flags &= ~0x01;
        break;

      //number of lines - 0x04
      case 'l':
        flags |= 0x04;
        break;

      //number of words - 0x08
      case 'w': //0x08
        flags |= 0x08;
        break;

      case '?':
        printf("usage: wc -wclm files..");

      default:
        return 1;
    }
  }

  files.list  = &argv[optind];
  files.count = argc - optind;

  return 0;
}
