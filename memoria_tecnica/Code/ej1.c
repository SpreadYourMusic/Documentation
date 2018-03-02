
enum state_t {
  Q0, Q1, Q2;
}

extern unsigned int B;

enum state_t state;
unsigned int count;

void start(){
  state = Q0;
  count = 0;
}

void interrupt(){
  switch(state){
    case Q0:
      if(B == 0){
        count++;
        state = Q1;
      }else if(B == 1){
        count--;
        state = Q2;
      }
      break;
    case Q1:
      if(B == 1){
        count--;
        state = Q2;
      }
      break;
    case Q2:
      if(B == 0){
        count++;
        state = Q1;
      }
      break;
  }
}