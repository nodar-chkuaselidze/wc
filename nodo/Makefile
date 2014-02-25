CC=gcc
CFLAGS=-c -Wall
LDFLAGS=
SOURCES=wc.c
OBJECTS=$(SOURCES:.c=.o)
EXECUTABLE=wc
COMPILE_FOLDER=bin

all: $(SOURCES) $(EXECUTABLE)
		
$(EXECUTABLE): $(OBJECTS) 
		$(CC) $(LDFLAGS) $(addprefix $(COMPILE_FOLDER)/, $(OBJECTS)) -o $(COMPILE_FOLDER)/$@

.c.o:
		$(CC) $(CFLAGS) $< -o $(COMPILE_FOLDER)/$@

clean:
	rm -rf $(COMPILE_FOLDER)/*.{o,a}
