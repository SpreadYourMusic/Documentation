
enum state_t {
  Q0, Q1, Q2, Q3:
}

extern unsigned int A;
extern unsigned int B;

enum state_t state;
unsigned int count;

void start(){
  state = Q0;
  count = 0;
}

void clk(){
  switch(state){
    case Q0:
      if(A == 1 && B == 0){
        state = Q1;
        count++;
      }else if(A == 0 && B == 1){
        state = Q3;
        count--;
      }
      break;
    case Q1:
      if(A == 1 && B == 1){
        state = Q2;
        count++;
      }else if(A == 0 && B == 0){
        state = Q0;
        count--;
      }
      break;
    case Q2:
      if(A == 0 && B == 1){
        state = Q3;
        count++;
      }else if(A == 1 && B == 0){
        state = Q1;
        count--;
      }
      break;
    case Q3:
      if(A == 0 && B == 0){
        state = Q0;
        count++;
      }else if(A == 1 && B == 1){
        state = Q0;
        count--;
      }
      break;
  }
}