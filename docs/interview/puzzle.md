---
icon: note
date: 2022-01-11
category:
  - 面经汇总
tag:
  - 智力题
---

# 智力题
## 1、小白鼠吃毒药问题

**问题：**有1000个一模一样的瓶子，其中有999瓶是普通的水，有1瓶是毒药。任何喝下毒药的生命都会在一星期之后死亡。现在你只有10只小白鼠和1个星期的时间，如何检验出哪个瓶子有毒药？

**解答：**首先一共有1000瓶，2的10次方是1024，刚好大于1000， 也就是说，1000瓶药品可以使用10位二进制数就可以表示，需要10只老鼠，按照顺序编号为10、9、8、...、1，分别代表从高位到低位每一个位，第i瓶药给i对应的二进制上为1的老鼠吃，例如第一瓶药给第1个老鼠吃，第二瓶给第2号吃，第三瓶给第1和第2吃...最终死去的老鼠肯定都吃了毒药，例如10 0110 0101对应二进制上为1的老鼠都死了，所以毒药就是转换为10进制就是613号。

+ 第一瓶药：00 0000 0001

+ 第二瓶药：00 0000 0010

+ ...

+ 第999瓶药：11 1111 0010

+ 第1000瓶药：11 111 0011

## 2、分金块问题

**问题：**工人为老板打工，工作七天可以获得一块金子，工人每天可以分得一点金子，老板必须每天发金子，不能多给，也不能少给，把这个金子切两刀，就可以每天给工人发工资，请问怎么切？

**解答：**切两刀将金子分成三份，1/7、2/7、4/7；

+ 工作第一天 把1/7分给工人；

+ 工作第二天 把2/7分给工人，并要回1/7那块金子，工人有2/7的金子；

+ 工作第三天 把1/7给工人 工人有3/7金子；

+ 工作第四天 把前两块金子要回，给工人4/7的金子 工人有4/7的金子；

+ 工作第五天 把1/7分给工人 工人有5/7的金子；

+ 工作第六天 把2/7分给工人，并要回1/7那块金子，工人有6/7的金子；

+ 工作第七天 把1/7给工人 工人有完整的金子；

**扩展：如何给工人发15天工资？把金块分成1/15、2/15、4/15、8/15。**

## 3、开关灯问题

**问题：**有100盏灯，编号依次为1，2，3...100，电灯全部关着。现在来了100个人，第一个人把所有的灯开关按下；第二个人隔一个灯按下（2，4，6…）；第三个人每隔两个灯按下（3，6，9…）；第100个人隔99个灯按下（100）,最后还有哪几盏灯亮着的。

**解答：**由于开始时所有等都是熄灭的，所以可知，一盏灯如果被按的次数是奇数次，那么最后是亮着的，被按偶数次，最后是熄灭的。而一盏灯被按的次数，就是它的编号的约数的个数，比如1号灯就只有1这个约数，只被按一次；2号灯有1和2两个约数，被按两次，4号灯有1，2，4三个约数，被按3次，最终约数个数是奇数的灯是亮着的。而可以证明，只有完全平方数的约数的个数是奇数的，所以100盏灯中，编号为完全平方数的是亮着的，也就是1、4、9、16、25、36、49、64、81、100。

## 4、猎人捉狐狸

**问题：**有5个山洞，一字排开，一只狐狸住在某个洞中，每天晚上会换住到相邻的洞中，猎人只能每天早上去检查一个洞，请问猎人最多几天能捉到狐狸，怎么做。

**解答：**234432最多6天。

+ 第一天查看第2个山洞，如果不在，则可能在1、3、4、5中，那么晚上只可能跑到2、3、4、5中；
+ 第二天查看第3个山洞，如果不在则可能在2、4、5中，晚上只可能跑到1、3、4、5中；
+ 第三天查看第4个山洞，如果不在则可能在1、3、5中，晚上只可能跑到2、4中；
+ 第四天查看第4个山洞，如果不在只可能在2中，那么晚上只可能跑到1或者3中；
+ 第五天查看3号山洞，如果不在则只可能在1中，晚上就会跑到2号山洞中；
+ 第六天直接查看2号山洞，狐狸一定在里面。

## 5、抛硬币吃苹果问题

**问题：**甲乙两人通过抛硬币决定谁吃苹果，假设甲先抛，乙后抛，那么甲吃到苹果的概率有多大？

**解答：**2/3

设甲吃到苹果的总概率为P，由于甲先抛硬币，则有1/2的概率抛一次就吃到苹果，假如第一次没有吃到，那么第二次抛以及以后抛硬币，吃到苹果的概率为1/2 * 1/2 * P，即甲第一次抛没吃到的概率 * 乙第一次抛没吃到的概率 * 以后抛吃到的概率（也就是总概率P），因此有 1/2 + 1/2 \* 1/2 \* P = P，解得P = 2/3。

## 6、烧绳子计时问题

**问题：**一根不均匀的绳子从一端烧尽到另一端用时 1 小时，现有若干根材质相同的绳子，如何 计时 30 分钟？如何计时 45 分钟？

**解答：**这个问题难点在于绳子是不均匀的，所以烧一半并不代表用时30分钟，但是关键是找到两个时间度量，30分钟和15分钟。不管绳子是否均匀，从一头烧完一整根用时肯定是1小时，从两头开始烧烧完一整根用时就是30分钟，因此可以如下：

计时30分钟：取一根绳子同时点燃两头，当绳子烧完后正好用时30分钟；

计时45分钟：取两根绳子，第一根绳子点燃两头，第二根绳子只点燃一头，当第一根绳子烧完后刚好用时30分钟，此时立即点燃第二根绳子的另一头，当第二根绳子烧完后刚好又过了15分钟，总共用时30 + 15 = 45分钟。

**注意：关键就是找到30和15分钟的度量，还能衍生出各种计时方法。**    