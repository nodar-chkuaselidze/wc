CC=gcc
CFLAGS=-c -Wall
LDFLAGS=
SOURCES=wc.c
OBJECTS=$(SOURCES:.c=.o)
EXECUTABLE=bin/wc

all: $(SOURCES) $(EXECUTABLE)
		
$(EXECUTABLE): $(OBJECTS) 
		$(CC) $(LDFLAGS) $(OBJECTS) -o $@

.c.o:
		$(CC) $(CFLAGS) $< -o $@

clean:
	rm -rf *.{o,a} {*.,}test
