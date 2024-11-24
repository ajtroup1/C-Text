#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
// atexit()

#include <termios.h>
// For terminal I/O control

#include <unistd.h>
// STDIN_FILENO
// read()

// Global var to store the default (unaltered) terminal attributes to restore them after exit
struct termios orig_termios;

// Restore the terminal to its original settings
void disableRawMode()
{
  // Use tcsetattr to restore the original terminal attributes
  // TCSAFLUSH ensures that all pending input is flushed before the change
  tcsetattr(STDIN_FILENO, TCSAFLUSH, &orig_termios);
}
// Enable "raw mode" in the terminal
void enableRawMode()
{
  // Retrieve the current terminal attributes and store them in orig_termios
  tcgetattr(STDIN_FILENO, &orig_termios);
  // Register the disableRawMode function to be called automatically when the program exits
  // Similar to "defer" or "finally"
  atexit(disableRawMode);
  // Create a new termios structure to modify attributes for raw mode
  struct termios raw = orig_termios;
  // ~ECHO disables the mirroring of typed text in the terminal
  raw.c_iflag &= ~(BRKINT | ICRNL | INPCK | ISTRIP | IXON);
  raw.c_oflag &= ~(OPOST);
  raw.c_cflag |= (CS8);
  raw.c_lflag &= ~(ECHO | ICANON | IEXTEN | ISIG);
  raw.c_cc[VMIN] = 0;
  raw.c_cc[VTIME] = 1;
  // Apply the modified terminal attributes
  // TCSAFLUSH ensures that all pending input is flushed
  tcsetattr(STDIN_FILENO, TCSAFLUSH, &raw);
}

int main()
{
  // Enable terminal raw mode
  // Raw mode just means typed input is not immediately echoed, the program decides whether to.
  enableRawMode();
  // Enter a loop to read single characters from the standard input
  // read() reads 1 byte at a time from STDIN_FILENO into the variable `c`
  // The loop continues until the character 'q' is typed
  while (1)
  {
    char c = '\0';
    read(STDIN_FILENO, &c, 1);
    if (iscntrl(c))
    {
      printf("%d\r\n", c);
    }
    else
    {
      printf("%d ('%c')\r\n", c, c);
    }
    if (c == 'q')
      break;
  }
  // When 'q' is typed, the loop exits and the program ends
  return 0;
}