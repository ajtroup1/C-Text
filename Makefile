# Compiler and flags
CC = gcc
CFLAGS = -Wall -Wextra -Werror -pedantic -g
INCLUDE = -Iinclude
LDFLAGS = -lm  # Linker flags, e.g., math library (if needed)

# Directories
SRC_DIR = src
INCLUDE_DIR = include
BUILD_DIR = build
TEST_DIR = tests

# Source files and object files
SRC = $(wildcard $(SRC_DIR)/*.c)
OBJ = $(patsubst $(SRC_DIR)/%.c, $(BUILD_DIR)/%.o, $(SRC))

# Output binary
TARGET = text_editor

# Test binary
TEST_TARGET = test_runner

# Default target
all: $(TARGET)

# Build the target executable
$(TARGET): $(OBJ)
	$(CC) $(CFLAGS) $(OBJ) -o $(TARGET) $(LDFLAGS)

# Compile source files into object files
$(BUILD_DIR)/%.o: $(SRC_DIR)/%.c
	@mkdir -p $(BUILD_DIR)  # Ensure build directory exists
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $@

# Run tests
test: $(TARGET)
	$(CC) $(CFLAGS) $(SRC) $(wildcard $(TEST_DIR)/*.c) -o $(TEST_TARGET) $(INCLUDE)
	./$(TEST_TARGET)

# Clean build artifacts
clean:
	rm -rf $(BUILD_DIR) $(TARGET) $(TEST_TARGET)

# Phony targets (not actual files)
.PHONY: all clean test
