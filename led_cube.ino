#define POS_PIN_COUNT 2
#define NEG_PIN_COUNT 3

struct led_state {
  char led_values[(int) ceil(POS_PIN_COUNT * NEG_PIN_COUNT / 8.0)];
};

const int positive_pins[POS_PIN_COUNT] = {16, 17};
const int negative_pins[NEG_PIN_COUNT] = {18,19,21};

void setLED(int x, int y)
{
  for (int i = 0; i < POS_PIN_COUNT; i++)
  {
    
    if (x == i) {
      digitalWrite(positive_pins[i], HIGH);
    } else {
      digitalWrite(positive_pins[i], LOW);
    }
  }

  for (int i = 0; i < NEG_PIN_COUNT; i++)
  {
    if (y == i) {
      digitalWrite(negative_pins[i], LOW);
    } else {
      digitalWrite(negative_pins[i], HIGH);
    }
  }
}

void setup() {
  // put your setup code here, to run once:
  for (int i = 0; i < POS_PIN_COUNT; i++)
  {
    pinMode(positive_pins[i], OUTPUT);
  }

  for (int i = 0; i < NEG_PIN_COUNT; i++)
  {
    pinMode(negative_pins[i], OUTPUT);
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  for (int i = 0; i < POS_PIN_COUNT; i++)
  {
    for (int j = 0; j < NEG_PIN_COUNT; j++)
    {
      setLED(i, j);
      delay(1000);
    }
  }
}
