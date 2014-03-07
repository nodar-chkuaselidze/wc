CC=gcc
CFLAGS=-c -Wall
LDFLAGS=
SOURCES=wc.c
OBJECTS=$(SOURCES:.c=.o)
EXECUTABLE=wc
COMPILE_FOLDER=../bin

all: $(SOURCES) $(EXECUTABLE)
	@echo "Compiled everything"

debug: CFLAGS += -g
debug: all
	@echo "Debugging included"

$(EXECUTABLE): $(OBJECTS) 
	@echo "Compiling executable"
	$(CC) $(LDFLAGS) $(addprefix $(COMPILE_FOLDER)/, $(OBJECTS)) -o $(COMPILE_FOLDER)/$@

.c.o:
	@echo "Compiling Source files $< to $@"
	$(CC) $(CFLAGS) $< -o $(COMPILE_FOLDER)/$@

clean:
	rm -rf $(COMPILE_FOLDER)/*.{o,a}

clear: clean
	rm $(COMPILE_FOLDER)/wc
