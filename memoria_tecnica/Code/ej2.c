enum interrupt_type {
  A, B;
}

enum state_t {
  Q0, Q1, Q2, Q3;
}

enum state_t state;
unsigned int count;

void start(){
  state = Q0;
  count = 0;
}

void interrupt(enum interrupt_type interrupt){
  if(
    (interrupt == A && (state == Q0 || state == Q2)) || 
    (interrupt == B && (state == Q1 || state == Q3))){
      //(A and (Q0 or Q2)) or (B and (Q1 or Q3))
    state = (state + 1) & 0x3;
    count++;
  }else if(
    (interrupt == A && (state == Q1 || state == Q3)) || 
    (interrupt == B && (state == Q0 || state == Q2))){
      //(A and (Q1 or Q3)) or (B and (Q0 or Q2))
    state = (state - 1) & 0x3;
    count--;
  }
}