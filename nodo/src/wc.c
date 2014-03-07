#include <stdio.h>
#include <errno.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <stdbool.h>

typedef struct files {
  char **list;
  uint16_t count;
} FILES;

int main (int argc, char **argv) {
  uint8_t flags = 0;
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

long getFileBytes(char *fileName) {
  struct stat fileStats;
  int error = stat(fileName, &fileStats);

  if (error == false) {
    return fileStats.st_size;
  }

  printf("%d", errno);
  return -1;
}
