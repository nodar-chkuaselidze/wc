#include <stdio.h>
#include <errno.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <stdbool.h>

#define WC_MULTIBYTES 0x01
#define WC_BYTES      0x02
#define WC_LINES      0x04
#define WC_WORDS      0x08

typedef uint16_t wc_fcount;
typedef uint8_t  wc_flags;

typedef struct files {
  char **list;
  wc_fcount count;
} FILES;

void countThings(char *, wc_flags);
off_t getFileBytes(char *);

int main (int argc, char **argv) {
  wc_flags flags = 0;
  char c;

  FILES files;

  while ((c = getopt(argc, argv, "clmw")) != -1)
  {
    switch (c) {
      //number of multi-bytes
      case 'm':
        flags |= WC_MULTIBYTES;
        flags &= ~WC_BYTES;
        break;

      //number of bytes
      case 'c':
        flags |= WC_BYTES;
        flags &= ~WC_MULTIBYTES;
        break;

      //number of lines
      case 'l':
        flags |= WC_LINES;
        break;

      //number of words 
      case 'w':
        flags |= WC_WORDS;
        break;

      case '?':
        printf("usage: wc -wclm files..");

      default:
        return 1;
    }
  }

  files.list  = &argv[optind];
  files.count = argc - optind;

  for (wc_fcount i = 0; i < files.count; i++) {
    countThings(files.list[i], flags);
  }

  return 0;
}

void countThings(char *fileName, wc_flags flags) {
  printf("%s\n", fileName);
  printf("%lld\n", getFileBytes(fileName));
}


off_t getFileBytes(char *fileName) {
  struct stat fileStats;
  int error = stat(fileName, &fileStats);

  if (error == false) {
    return fileStats.st_size;
  }

  
  return -1;
}
