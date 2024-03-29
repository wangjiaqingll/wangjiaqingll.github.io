---
icon: note
date: 2022-01-11
category:
  - 面经汇总
tag:
  - 操作系统
---

# 操作系统

## 操作系统简介

## 1、解释一下什么是操作系统

操作系统是管理硬件和软件的一种应用程序，是运行在计算机上最重要的一种软件，它管理计算机的资源和进程以及所有硬件和软件。他为计算机硬件和软件提供一种中间层，使应用软件和硬件进行分离，让我们无需关心硬件的实现，把关注点更多的放在软件应用上。通常情况下，计算机上会运行着许多应用程序，它们都需要对内存和CPU进行交互，操作系统的目的就是为了保证这些访问和交互能够准确无误进行。

## 2、操作系统的主要功能有哪些

一般来说，现代操作系统主要提供下面几种功能：

+ **进程管理：**进程管理的主要作用就是任务调度，在单核处理器下，操作系统会为每个进程分配一个任务，进程管理的工作十分简单；而在多核处理器下，操作系统除了要为进程分配任务外，还要解决处理器的调度、分配和回收等问题；

+ **内存管理：**内存管理主要是负责管理内存的分配、回收，在进程需要时分配内存以及在进程完成时回收内存，协调内存资源，通过合理的页面置换算法进行页面的换入换出。

+ **设备管理：**根据确定的设备分配原则对设备进行分配，使设备与主机能够并行工作，为用户提供良好的设备使用界面。

+ **文件管理：**有效地管理文件的存储空间，合理地组织和管理文件系统，为文件访问和文件保护提供更有效的方法和手段。

+ **提供用户接口：**操作系统提供了访问应用程序和硬件的接口，使用户能够通过应用程序发起系统调用从而操纵硬件，实现想要的功能。

## 3、软件访问硬件的几种方式（IO控制方式）

软件访问硬件其实就是一种IO操作，软件访问硬件的方式就是IO操作的方式。硬件在I/O上大致分为并行和串行，同时对应着并行接口和串行接口。随着计算机技术的发展，I/O控制方式也在不断发展，选择和衡量I/O控制方式有如下三条原则：

1、数据传送速度足够快，能满足用户的需求但又不丢失数据；

2、系统开销小，所需的处理控制程序少；

3、能充分发挥硬件资源的能力，使I/O设备尽可能忙，而CPU等待时间尽可能少。

根据以上控制原则，I/O操作可以分为四类：

+ **直接程序控制：**由用户进程直接控制主存或CPU和外围设备间的信息传送，直接程序控制方式又称为忙/等待方式。直接程序控制方式虽然简单，不需要多少硬件的支持，但由于高速的 CPU 和低速的 I/O 设备之间的速度上不匹配，因此，CPU 与外围设备只能串行工作，使 CPU 的绝大部分时间都处于等待是否完成 I/O 操作的循环测试中，造成 CPU 的极大浪费，外围设备也不能得到合理的使用，整个系统的效率很低。因此，这种I/O控制方式只适合于 CPU 执行速度较慢，且外围设备较少的系统。

+ **中断驱动控制：**为了减少程序直接控制方式下CPU的等待时间以及提高系统的并行程度，系统引入中断机制。中断机制引入后，外围设备仅当操作正常结束或异常结束时才向CPU发出中断请求。在I/O设备输入数据过程中，由于无需CPU的干预，一定程度上实现了CPU与I/O设备的并行工作。仅当输入或输出完成后，才需CPU花费极短的时间做中断处理。存在的问题：**由于I/O操作直接由 CPU 控制，每传送一个字符或一个字，都要发生一次中断，仍然占用了大量的 CPU 处理时间，因此可以通过为外围设备增加缓冲寄存器存放数据来减少中断次数。**

上述两种方法的特点都是以CPU为中心，数据传送通过一段程序来实现，软件的传送手段限制了数据传送的速度。还有两种I/O控制方式采用硬件的方法来显示I/O操作:

+ **DMA直接内存访问：**为了进一步减少CPU对I/O操作的干预，防止因并行操作设备过多使CPU来不及处理或因速度不匹配而造成的数据丢失现象，引入了DMA控制方式。**在 DMA 控制器的控制下，采用窃取或挪用总线控制权，在设备和主存之间开辟直接数据交换通道，成批地交换数据，而不必让 CPU 干预。**

+ **通道控制方式：**通道是独立于CPU的专门负责输入输出控制的处理机，它控制设备与内存直接进行数据交换。有自己的通道指令，这些指令由CPU启动，并在操作系统结束时向CPU发出中断信号。直接程序控制方式和中断程序控制方式适合于低速设备的数据传送，而 DMA 方式虽然适合于高速设备的数据传送，但一个 DMA 控制器只能控制少量的同类设备，这远远不能满足大型计算机系统的需要。通常，一个大型计算机需要连接大量的高速和低速设备，通道控制方式可以满足这个要求，（DMA和通道控制方式的主要区别——能否满足大型计算机系统的既能处理高速设备又能处理低速设备的需要）。

  通道控制方式，实现了CPU、通道和I/O设备三者的并行操作，从而更加有效地提高整个系统的资源利用率。例如，当 CPU 要完成一组相关的读（或写）操作时，只需要向 I/O 通道发出一条 I/O 指令，指出其所要执行的通道程序的首址和要访问的I/O设备，通道接收到该指令后，通过执行通道程序便可完成 CPU 指定的 I/O 任务。可见，通道只是在 I/O 操作的起始和结束时向 CPU 发出 I/O 中断申请，相对于之前的控制方式进一步减少了 CPU 的干预程度。

## 4、解释一下操作系统的主要目的

操作系统是一种软件，它的主要目的有三种：

+ 管理计算机资源，包括CPU、内存、磁盘驱动器、打印机等；

+ 提供一种图形界面，搭建用户和计算机之间交互的桥梁；

+ 为其它软件提供服务，操作系统与软件进行交互，以便为其分配运行所需的任何必须资源。

## 5、操作系统的种类有哪些

常见的操作系统类型有Windows、MacOS、Linux等。

## 6、为什么Linux系统下的应用程序不能直接在Windows下运行

一方面是由于Linux系统和Windows系统的文件格式不同，格式就是协议，Linux下可执行程序文件格式是elf，而Windows下可执行程序是PE格式，它是一种可移植的可执行文件；

另一方面是因为Linux系统和Windows系统的API不同，Linux系统的API被称为系统调用，是通过int 0x80这个软中断实现的。而Windows中的API是放在动态链接库库文件中的，也就是常说的DLL，这是一个库，里面包含代码和数据。Linux中的可执行程序获得系统资源的方法和Windows不一样，所以显然不能在Windows中运行。

## 7、操作系统的结构

+ **单体系统**：在大多数系统中，整个系统在内核态以单一程序的方式运行。整个操作系统是以程序集合的方式来编写的，链接在一块形成一个大的二进制可执行程序，这种系统称为单体系统。在单体系统中构造实际目标程序时，会首先编译所有单个过程（或包含这些过程的文件），然后使用系统链接器将它们全部绑定到一个可执行程序中 。在单体系统中，对于每个系统调用都会有一个服务程序来保障和运行。需要一组实用程序来弥补服务程序需要的功能，例如从用户程序中获取数据。

  除了在计算机初启动时所装载的核心操作系统外，许多操作系统还支持额外扩展，比如I/O设备驱动和文件系统，这些部件可以按需加载，在Linux中称为共享库，在Windows中称为动态链接库。

+ **分层操作系统：**分层操作系统使用层来分割不同的功能单元，每一层只与该层的上层和下层通信，每一层都使用下面的层来执行其功能，层之间的通信通过预定义的固定接口通信。

  <img src="https://ask.qcloudimg.com/http-save/yehe-5359587/uwomvbvomg.png?imageView2/2/w/1620" alt="img"  />

+ **微内核：**为了实现高可靠性，将操作系统划分成小的、层级之间能够更好定义的模块是很有必要的，只有一个模块 --- 微内核 --- 运行在内核态，其余模块可以作为普通用户进程运行。由于把每个设备驱动和文件系统分别作为普通用户进程，这些模块中的错误虽然会使这些模块崩溃，但是不会使整个系统死机。MINIX 3是微内核的代表作，它的具体结构如下：

  

  ![img](https://ask.qcloudimg.com/http-save/yehe-5359587/jiggkmutnu.png?imageView2/2/w/1620)

  在内核的外部，系统的构造有三层，它们都在用户态下运行，最底层是设备驱动器。由于它们都在用户态下运行，所以不能物理的访问 I/O 端口空间，也不能直接发出 I/O 命令。相反，为了能够对 I/O 设备编程，驱动器构建一个结构，指明哪个参数值写到哪个 I/O 端口，并声称一个内核调用，这样就完成了一次调用过程。

+ **客户-服务器模型：**微内核思想的策略是把进程划分为两类：`服务器`，每个服务器用来提供服务；`客户端`，使用这些服务。这个模式就是所谓的 `客户-服务器`模式。客户-服务器模式会有两种载体，一种情况是一台计算机既是客户又是服务器，在这种方式下，操作系统会有某种优化；但是普遍情况下是客户端和服务器在不同的机器上，它们通过局域网或广域网连接。![img](https://ask.qcloudimg.com/http-save/yehe-5359587/78b8hz43zm.png?imageView2/2/w/1620)

  客户通过发送消息与服务器通信，客户端并不需要知道这些消息是在本地机器上处理，还是通过网络被送到远程机器上处理。对于客户端而言，这两种情形是一样的：都是发送请求并得到回应。

## 8、什么叫陷入内核

如果把软件结构进行分层说明的话，应该是下面这个样子的，最外层是应用程序，里面是操作系统内核。应用程序处于特权级 3，操作系统内核处于特权级 0 。如果用户程序想要操作系统资源，会发起系统调用，陷入内核，这样 CPU 就进入了内核态，执行内核代码。至于为什么是陷入，我们看图，内核是一个凹陷的构造，有陷下去的感觉，所以称为陷入。

![img](https://ask.qcloudimg.com/http-save/yehe-5359587/ye4pmvwojz.png?imageView2/2/w/1620)

## 9、什么是用户态和内核态

用户态和内核态是操作系统的两种运行状态。

+ 一般处于特权级为0的状态称为内核态，内核态的CPU可以访问任意的数据，包括外围设备，比如网卡、硬盘等，处于内核态的CPU可以从一个程序切换到另一个程序，并且占用的CPU不会发生抢占行为。

+ 一般处于特权级为3的状态称为用户态，用户态的CPU只能受限地访问内存，并且不允许访问外围设备，用户态的CPU不允许独占，也就是会被其他程序获取。

## 10、为什么要区分内核态和用户态

主要是限制访问能力，增加安全性。计算机中有一些危险操作，比如内存管理，这些都需要在内核态下完成，用户态只能通过系统调用，这样就在用户和硬件之间增加了一个缓冲，避免用户操作不当造成硬件的损坏。

## 11、内核态和用户态是怎样隔离起来保证不能相互访问的

因为CPU指令集有权限分级，CPU指令集是可以直接操作硬件的，但是如果操作不当很容易引起灾难性后果，为了避免出现这种情况，硬件厂商直接从硬件级别上做了限制，做法就是给CPU指令集设计权限，例如Inter把CPU操作权限由高到低分为4级，ring 0, ring 1, ring 2, ring 3，ring 0 权限最高，可以使用所有CPU指令集，ring 3权限最低，仅能使用常规CPU指令集。Linux系统采用的就是ring 0和ring 3两个权限等级。简单点说就是ring 0对应内核态，ring 3对应用户态，两者的隔离实际上是从硬件级别就有限制，每个进程都会有两个栈，分别是内核栈和用户栈，对应内核态和用户态使用。

## 12、用户态和内核态是如何进行切换的

用户程序都是运行在用户态，但是当某些操作需要在内核态进行操作时，就需要切换到内核态，这种切换是通过系统调用完成的，而且能够执行系统调用的只有操作系统。

一般用户态切换到内核态也叫做trap进内核，也称之为陷入指令，工作流程大致如下：

+ 首先用户调用glibc库，它是一个标准库，也是核心库，定义了许多API；

+ glibc库知道针对不同体系结构调用系统调用的正确方法，它会根据体系结构应用程序的二进制接口设置用户进程传递的参数，来准备系统调用；

+ glibc库调用软件中断指令（SWI），这个指令通过更新CPSR寄存器将模式改为超级用户模式，然后跳转到0x08处；

+ 到目前为止，整个过程仍处于用户态下，在执行 SWI 指令后，允许进程执行内核代码，MMU 现在允许内核虚拟内存访问；

+ 从地址 0x08 开始，进程执行加载并跳转到中断处理程序，这个程序就是 ARM 中的 `vector_swi()；`

+ 在 vector_swi() 处，从 SWI 指令中提取系统调用号 SCNO，然后使用 SCNO 作为系统调用表 `sys_call_table` 的索引，调转到系统调用函数；

+ 执行系统调用完成后，将还原用户模式寄存器，然后再以用户模式执行。

## 13、内核态和用户态的空间怎么区分

在Linux中虚拟地址空间范围为0到4G，最高的1G地址（0xC0000000到0xFFFFFFFF）供内核使用，称为内核空间，低的3G空间（0x00000000到0xBFFFFFFF）供各个进程使用，就是用户空间。

内核空间中存放的是内核代码和数据，而进程的用户空间中存放的是用户程序的代码和数据。

## 14、中断是什么

中断是指CPU正常运行期间，由于有内/外部事件，或者由程序预先安排的事件，引起CPU暂停当前工作，转而去处理该事件，当处理完该事件后再返回继续运行被中断(暂停)的程序。通常，操作系统将中断分为两类：外部中断(硬件中断)和内部中断(异常中断，即软件引起的)。

操作系统收到中断请求，会打断其他进程的运行，所以中断请求的响应程序，也就是中断处理程序要尽可能快的执行完，这样可以减少对正常进程运行调度的影响。而且中断处理程序在响应中断的时候，可能还会临时关闭中断，也就意味着其他中断请求可能会丢失。

## 15、什么是硬中断和软中断

中断请求的处理程序应该要短且快，这样才能减少对正常进程运行调度的影响，而且中断处理程序可能会暂时关闭中断，这时如果中断处理程序执行时间过长，可能在还未执行完中断处理程序前，会丢失当前其他设备的中断请求。Linux系统中为了解决中断处理程序执行时间过长和中断丢失的问题，将中断处理过程分为两个阶段：

+ **硬中断：**上半部分用来快速处理中断，直接处理硬件请求，称为硬中断，特点是执行速度快；

+ **软中断：**下半部分由内核触发，以内核线程的方式运行，处理上半部分还未完成的任务，称为软中断，通常执行时间长，可以延迟执行。

## 16、硬中断和软中断的区别

+ 硬中断的执行是由外设引发的，而软中断的执行是中断指令产生的；

+ 硬中断的中断号是由中断控制器提供的，软中断的中断号由指令直接指出，无需使用中断控制器；

+ 硬中断是可屏蔽的，软中断不可屏蔽（都是外设引起的）；

+ 硬中断处理程序要确保它能快速地完成任务，这样程序执行时才不会等待较长时间，称为上半部。软中断处理硬中断未完成的工作，是一种推后执行的机制，属于下半部；

+ 硬中断是可以嵌套的，软中断不可以。

## 17、可屏蔽中断和不可屏蔽中断的区别

+ 可屏蔽中断是通过**INTR**信号线进入CPU，外部硬件设备产生的中断CPU可以理会，也可以不理会，因为此类中断不会让操作系统宕机，比如网卡错误等；

+ 不可屏蔽中断是指通过**NMI**信号线进入CPU，表示系统中出现了致命的错误，此类错误会导致操作系统宕机，因此不可以屏蔽，必须进行响应的处理，比如内存读写错误、电源掉电等。

## 18、中断处理过程

+ **中断请求阶段：**在CPU内部发生的中断（内部中断）不需要中断请求，由中断控制逻辑直接处理；外部中断由中断源提出中断请求，可以通过中断输入引脚输入，可以分为可屏蔽中断和不可屏蔽中断；由于中断请求和CPU中断处理时间不确定，所以每个中断会有一个中断请求触发器，锁存自己的中断请求信号，并保持到CPU响应这个中断请求后才清除。CPU内部有一个中断允许触发器，当其为1时，允许CPU响应中断，称为开中断；若为0，不允许响应中断，中断被屏蔽，称为关中断。

+ **中断判优阶段**：CPU一次只能接受一个中断请求，当多个中断源同时向CPU提出中断请求时，CPU必须找出中断优先级最高的中断源，这一过程称为中断判优。中断判优可以采用硬件方法，也可以采用软件方法。

  软件判优：CPU检测到中断请求后，首先读取中断请求寄存器的内容，逐位检测它们的状态，检测到某一位为1，就确定对应的中断源有中断请求，转去执行它的中断服务程序。先检测哪一个，哪一个的优先级就高，后检测哪一个，哪一个优先级就低，检测的顺序就是各中断源的优先级顺序。**软件判优耗时较长。如果中断源很多，中断的实时性就很差，但是软件判优优先权安排灵活。**

  硬件判优：利用专门的硬件电路确定中断源的优先级，有两种常见的方式：**菊花链判优电路和中断控制器判优**。

+ **中断响应阶段：**经过中断判优，中断处理就进入中断响应阶段。中断响应时，CPU向中断源发出中断响应信号，同时：

  1）保护硬件现场；2）关中断；3）保护断点；4）获得中断服务程序的入口地址。

+ **中断服务阶段：**中断服务程序的一般结构为：

  1）**保护现场。** 在中断服务程序的起始部分安排若干条入栈指令，将各寄存器的内容压入堆栈保存。

  2）**开中断。** 在中断服务程序执行期间允许级别更高的中断请求中断现行的中断服务程序，实现中断嵌套。

  3）**中断服务。** 完成中断源的具体要求。

  4）**恢复现场。** 中断服务程序结束前，必须恢复主程序的中断现场。通常是将保存在堆栈中的现场信息弹出到原来的寄存器中。

  5）**中断返回。** 返回到原程序的断点处，继续执行原程序。

+ **中断返回阶段：**返回到原程序的断点处，恢复硬件现场，继续执行原程序。**中断返回操作是中断响应操作的逆过程。**

## 19、什么是缺页中断

当CPU访问的页面不在物理内存时，便会产生一个缺页中断，请求操作系统将所缺页调入到内存。它与一般的中断主要区别在于：

+ 缺页中断在指令**执行期间**产生和处理中断信号，而一般中断在一条指令**执行完成**后检查和处理中断信号。
+ 缺页中断返回到该指令的开始处重新执行该指令，而一般中断返回回到该指令的下一个指令执行。

## 20、缺页中断的处理流程

+ 在CPU里访问一条Load M指令，然后CPU会去找M所对应的页表项；
+ 如果该页表项的状态位是有效的，那CPU就可以直接去访问物理内存了，如果状态位是无效的，则CPU会发送缺页中断请求；
+ 操作系统收到缺页中断，会执行缺页中断处理函数，会查找该页面在磁盘中的页面位置；
+ 找到磁盘中对应的页面后，需要把该页面换入到物理内存中，但是在换入前，需要在物理内存中找到空闲页，如果找到空闲页（找不到就需要进行页面置换），就把页面换入到物理内存中；
+ 页面从磁盘换入到物理内存完成后，则把页表项中的状态位修改为有效的；
+ 最后，CPU重新执行导致缺页异常的指令。

## 21、并发和并行有什么区别

+ 并发就是在一段时间内，多个任务都会被处理；但在某一时刻，只有一个任务在执行，单核处理器可以做到并发，比如有两个进程`A`和`B`，`A`运行一个时间片之后，切换到`B`，`B`运行一个时间片之后又切换到`A`。因为切换速度足够快，所以宏观上表现为在一段时间内能同时运行多个程序。

+ 并行就是在同一时刻，有多个任务在同时执行，这个需要多核处理器才能完成，在微观上就能同时执行多条指令，不同的程序被放到不同的处理器上运行，这个是物理上的多个进程同时进行。

## 22、什么是链接文件

链接文件是Linux文件系统的一个特性，如需要在系统上维护同一文件的两份或多份副本，除了保存多份单独的物理文件副本之外，还可以采用保存一份物理文件副本和多个虚拟副本的方法。这种虚拟的副本就称为链接，链接是目录中指向文件真实位置的占位符。在Linux中有两种不同类型的文件链接： 硬链接和软连接（符号链接）。

## 23、硬链接和软连接的区别

- 硬链接就是在目录下创建一个条目，记录着文件名与 `inode` 编号，这个 `inode` 就是源文件的 `inode`。删除任意一个条目，文件还是存在，只要引用数量不为 `0`。但是硬链接有限制，它不能跨越文件系统，也不能对目录进行链接。

- 符号链接文件保存着源文件所在的绝对路径，在读取时会定位到源文件上，可以理解为 `Windows` 的快捷方式。当源文件被删除了，链接文件就打不开了。因为记录的是路径，所以可以为目录建立符号链接。

## 24、Linux操作系统的组成

Linux操作系统的基本组件有**Linux内核、Shell、GUI、系统程序和应用程序**几个部分。

+ 内核是Linux操作系统的核心，它充当软件和硬件之间的桥梁，它用来管理计算机上软硬件资源。
+ Shell是一个计算机程序，充当用户和内核之间的接口。用户可以通过在Shell上编写程序，命令和脚本来与内核进行通信。它接受人类可读的命令，并将其转换为内核可理解的语言。
+ GUI代表图形用户界面，这是用户与系统交互的另一种方式。但这与图像，按钮，用于交互的文本框不同。
+ 系统程序是用于用户管理计算机的软件功能集合。
+ 应用程序是运行在操作系统上的一系列用户进程。

## 25、什么是环境变量

Linux系统中的环境变量是用来指定系统运行环境的一些参数，比如我们使用命令的路径。

通过环境变量来帮助Linux系统构建起为用户服务的工作环境，是需要数百个变量来协同完成的。我们可以用env命令查看linux系统中所有的环境变量。

## 26、Linux命令执行的过程

+ 第一步判断用户是否以绝对路径或相对路径的方式输入命令，如果是根据路径指向的命令直接执行。
+ 检查用户输入的命令是否是“别名命令”。
+ 由SHELL解释器（Bash）判断用户输入命令是内部命令还是外部命令，内部命令是解释器内部的指令，会被直接执行。如果是外部命令，交由下一步执行。
+ 系统在多个路径中查找用户输入的命令文件，而定义这些路径的变量叫做PATH，PATH告诉解释器要执行的命令可能存放到了那里，然后bash就会在这些目录中逐个查找。PATH是由多个路径值组成的变量，每个路径值之间用冒号（：）间隔，对这些路径的增加和删除操作就是在直接影响bash解释器搜索linux命令的位置。

核心就是先找到命令在哪里，然后执行。

## 27、内核空间和用户空间如何进行通信

内核空间和用户空间通信方法一般有四种，分别是**系统调用、虚拟文件系统（proc、sysfs、debugs等）、ioctl接口和netlink**。

用户空间模式的驱动一般通过系统调用来完成对硬件的访问，如通过系统调用将驱动的io空间映射到用户空间等。因此，主要的判断依据就是系统调用。

# 进程线程协程相关

## 1、多处理器系统的优势

随着处理器的不断发展，计算机系统由单机系统变成了多处理器系统，多处理器系统拥有多个并行的处理器，系统的吞吐量更高，这些处理器共享时钟、内存、总线、外围设备等。多处理器系统由于可以共享资源，因此可以开源节流，可靠性也随之提高。

## 2、什么是进程和进程表

进程就是正在执行程序的实例，操作系统负责管理所有正在运行的进程，操作系统会为每个进程分配特定的时间来占用CPU，还会为每个进程分配特定的资源。

操作系统为了能够追踪每个进程的活动状态，维护了一个进程表，进程表的内部记录着每一个进程的状态以及使用到的资源等信息。

## 3、进程和线程的区别

+ 进程是程序运行的实例，是资源分配和管理的基本单位，而线程是进程的执行单元，一个进程至少有一个线程，也可包含多个线程。

+ 每一个进程都有自己独立的虚拟地址空间，全局变量，打开的文件描述符表等信息，而同一个进程中的多个线程除了拥有自己的堆栈指针和程序计数器以外，其余信息是共享的，因此进程的创建开销要比线程大。

+ 由于多进程拥有的信息是独立的，多线程许多信息是共享的，所以多线程同步上要比多进程更加方便一些，但是由于多线程资源共享，某个线程崩溃可能会导致整个进程崩溃，程序健壮性相对于多进程会弱一些。

+ 由于进程含有独立的虚拟地址空间，进程切换时会导致TLB页表缓存失效，所以多进程切换消耗会比多线程大，同时切换后程序运行速度会变慢。

## 4、进程和线程的切换(上下文切换)

一个进程存储在处理器各个寄存器中的中间数据叫做进程上下文，包括用户级上下文，比如数据块、程序块、程序堆栈等，系统级上下文，比如PCB进程控制块、内核栈等，以及寄存器上下文，进程切换的实质就是被终止运行的进程和待运行进程的上下文切换。

上下文切换时，操作系统将寄存器上下文保存到系统级上下文中。详细步骤为：

+ 切换页目录以使用新地址空间；

+ 切换内核栈；

+ 切换硬件上下文；

+ 刷新TLB缓存；

+ 恢复新进程的寄存器上下文，运行新进程。

而线程由于只有堆栈指针和程序计数器是独立的，所以切换的时候不需要做地址空间的切换，也就不会导致TLB缓存刷新失效。

## 5、僵尸进程和孤儿进程

+ **僵尸进程：**一个进程先于它的父进程终止，但是父进程没有调用`wait`或`waitpid`对其进行善后处理（获取终止子进程的有关信息，释放它所占有的资源）。这个进程就变成了僵尸进程，**消灭僵尸进程的唯一方法是终止其父进程**。

+ **孤儿进程：**一个进程的父进程先于该进程终止，那么这个进程就称成为了孤儿进程，孤儿进程被`init`进程收养，由`init`完成对他们的善后工作。

## 6、进程的执行过程是什么样的，执行一个进程需要做哪些工作

进程是程序执行的实例，要运行进程，首先要将源文件进行编译、链接成可执行文件，然后将程序装入内存创建得到进程，为进程分配相应的资源，等待系统调度运行。

所以进程的执行需要经过三大步骤：编译，链接和装入。

+ 编译：将源代码编译成若干模块；

+ 链接：将编译后的模块和所需要的库函数进行链接。链接包括三种形式：静态链接，装入时动态链接（将编译后的模块在链接时一边链接一边装入），运行时动态链接（在执行时才把需要的模块进行链接）；

+ 装入：将模块装入内存运行。

https://blog.csdn.net/qq_38623623/article/details/78306498

将进程装入内存时，通常使用分页技术，将内存分成固定大小的页，进程分为固定大小的块，加载时将进程的块装入页中，并使用页表记录。减少外部碎片。

通常操作系统还会使用虚拟内存的技术将磁盘作为内存的扩充。

## 7、什么是饥饿现象

饥饿是由于资源不足或分配策略不公引起的，当进程或线程无法访问它所需要的资源而不能继续执行时，就会发生饥饿现象。

## 8、有哪些进程调度算法

+ **先来先服务 （FCFS first come first serve）**：按照作业到达任务队列的顺序调度， **FCFS**是非抢占式的，易于实现，效率不高，性能不好，有利于长作业（CPU繁忙性）而不利于短作业（I/O繁忙性）。 

+ **短作业优先 （SHF short job first）**：每次从队列里选择预运行时间最短的作业运行。**SJF是抢占式的**，优先照顾短作业，具有很好的性能，降低平均等待时间，提高吞吐量。但是不利于长作业，长作业可能一直处于等待状态，出现饥饿现象；完全未考虑作业的优先紧迫程度，不能用于实时系统。

+ **最短剩余时间优先：** 该算法首先按照作业的服务时间挑选最短的作业运行，在该作业运行期间，一旦有新作业到达系统，并且该新作业的服务时间比当前运行作业的剩余服务时间短，则发生抢占；否则，当前作业继续运行。该算法确保一旦新的短作业或短进程进入系统，能够很快得到处理。

+ **高响应比优先调度算法（Highest Reponse Ratio First, HRRF）**：是非抢占式的，基本思想：每次进行作业调度时，先计算后备作业队列中每个作业的响应比，挑选最高的作业投入系统运行。响应比 = （等待时间 + 服务时间） / 服务时间 = 等待时间 / 服务时间 + 1。

+ **时间片轮转 （Round Robin，RR）**：用于**分时系统的进程调度**。基本思想：系统将CPU处理时间划分为若干个时间片，进程按照到达先后顺序排列。每次调度选择队首的进程，执行完1个时间片后，计时器发出时钟中断请求，将该进程移至队尾，以后每次调度都是如此。该算法能在给定的时间内响应所有用户的而请求，达到分时系统的目的。
+ **最高优先级调度算法（Highest Priority First，HPF）：**时间片轮转法对所有进程都一视同仁，但是往往进程是有优先级之分的，所以就出现了最高优先级调度算法。优先级分为静态优先级和动态优先级。静态优先级在进程创建的时候就确定了优先级，后面就不会改变；动态优先级根据进程的动态变化调整优先级，比如随着运行时间的增加降低优先级等等。**有抢占式和不可抢占式，缺点是优先级低的进程可能一直得不到运行**。

+ **多级反馈队列(Multilevel Feedback Queue)**：多级表示有多个队列，每个队列的优先级由高到底，优先级高的时间片越短。反馈表示如果有新的进程加入优先级高的队列，立即停止运行当前进程，转而去执行优先级高的队列。

更详细信息：[进程调度算法](https://www.cnblogs.com/xiaolincoding/p/13631224.html#:~:text=进程调度算法也称 CPU 调度算法，毕竟进程是由 CPU 调度的。 当 CPU 空闲时，操作系统就选择内存中的某个「就绪状态」的进程，并给其分配,其中发生在 1 和 4 两种情况下的调度称为「非抢占式调度」，2 和 3 两种情况下发生的调度称为「抢占式调度」。)

## 9、什么时候用多进程，什么时候用多线程

https://blog.csdn.net/yu876876/article/details/82810178

+ 频繁修改：需要频繁创建和销毁的优先使用**多线程**

+ 计算量：需要大量计算的优先使用**多线程** ，因为需要消耗大量CPU资源且切换频繁，所以多线程好一点

+ 相关性：任务间相关性比较强的用**多线程**，相关性比较弱的用多进程。因为线程之间的数据共享和同步比较简单。

+ 多分布：可能要扩展到多机分布的用**多进程**，多核分布的用**多线程**。

但是实际中更常见的是进程加线程的结合方式，并不是非此即彼的。

## 10、什么是PCB进程控制块

https://blog.csdn.net/qq_38499859/article/details/80057427

PCB就是进程控制块，是操作系统中的一种数据结构，用于表示进程状态，操作系统通过PCB对进程进行管理。

PCB中包含有：进程标识符，进程状态信息，程序计数器，进程上下文信息，内存指针等。

## 11、线程数量一般根据什么确定

CPU密集型任务：线程数 = CPU核心数 + 1

IO密集型任务：线程数 = CPU核心数 * 2 + 1

+ **CPU密集型：**所谓CPU密集型就是说处理任务**不需要依赖太多外部I/O**，比如科学计算、矩阵运算等，这种情况下只要线程数量和核心数基本相同就能充分利用CPU资源。

+ **I/O密集型：**这类任务**计算部分所占用的时间不多，大部分时间都用在了IO操作上**，比如磁盘IO、网络IO等，这类任务线程数的确定首先需要利用性能测评工具评估出用在IO等待上的时间WT(wait time)，以及CPU计算需要的时间(CT)，对于一个N核的系统，合适的线程数一般是N * (WT / CT + 1)，假设I/O等待时间和计算时间相同，那么你大概需要 2 N 个线程才能充分利用CPU资源，注意这只是一个理论值，具体设置多少需要根据真实的业务场景进行测试。

当然充分利用CPU不是唯一需要考虑的点，随着线程数量的增多，内存占用、系统调度、打开的文件数量、打开的socker数量以及打开的数据库链接等等是都需要考虑的，没有万能公式，要**具体情况具体分析**。

## 12、什么是协程

协程可以简单的理解成一种用户态的轻量级线程，也就是说协程是基于线程的，是线程上的子程序，一个线程上可以有多个协程，协程的调度完全由用户控制。线程切换有从内核态到用户态的开销，而协程的信息是保存在用户态的，不会带来内核态到用户态的开销。协程调度切换时，将寄存器上下文和栈保存到其他地方，在切回来的时候，恢复先前保存的寄存器上下文和栈，直接操作栈则基本没有内核切换的开销，可以不加锁的访问全局变量，所以上下文的切换非常快。

**协程 VS 线程**

+ 一个线程可以拥有多个协程，一个进程也可以单独拥有多个协程，这样python中则能使用多核CPU；

+ 线程进程都是同步机制，而协程则是异步；

+ 协程能保留上一次调用时的状态，每次过程重入时，就相当于进入上一次调用的状态。

## 13、协程的底层怎么实现的，怎么使用协程

协程是工作在用户态的轻量级线程，确切的说是线程上的执行体或者子程序，在线程上创建多个执行体，给它们指定执行入口，为它们在用户栈空间申请内存，记录下每个执行包括ID、栈的位置、执行入口等信息，这样就能按照需求调度不同的执行体，同时使得执行体运行在用户态不受内核影响，这就是实现协程的基本原理。

## 14、Linux线程有哪几种状态

+ 初始态：新建一个线程对象；

+ 就绪态：线程初始化完成，放进线程池中，等待分配任务以及获取CPU权限；

+ 运行态：线程获得任务以及相应资源，执行程序代码；

+ 阻塞态：线程因为某些原因暂时放弃资源，暂停运行，直到重新进入就绪态；

+ 完成态：线程执行完毕或者异常退出。

## 15、fork的写时复制（Copy On Write, COW）

传统的fork()系统调用直接把所有资源复制一份给新创建的进程。这种实现过于简单且效率低下，因为它拷贝的数据或许是可以共享的。更糟糕的是，如果新的进程打算立即执行一个新的程序，那么这些所有的拷贝都是没有意义的。所以Linux的fork()采用写时拷贝解决这一问题。写时拷贝是一种可以推迟甚至避免拷贝数据的技术。fork()出子进程时并不立即复制整个进程的地址空间，而是让父子进程共享同一个地址空间，父子进程的虚拟地址空间不同，但是物理地址空间相同。只用在需要写入的时候才会复制地址空间，从而使各个进程拥有各自的地址空间。在根本不会被写入的情况下，例如fork()后立即执行exec()，地址空间就无需被复制。fork()的实际开销就是复制父进程的页表以及给子进程创建一个进程描述符。大多数情况下，fork()一个新进程往往是需要立即执行一个可执行程序，所以写时拷贝技术可以避免拷贝大量根本就不会被使用到的数据。

## 16、fork和vfork的区别

fork和vfork都是用来创建新的子进程，区别在于fork新进程后除了虚拟地址空间不同，其余数据和父进程共享，只有当发生修改的行为时，才会分配独立的数据段、堆栈段物理空间，当调用exec时分配完全独立的物理空间。而vfork直接创建的子进程一开始完全共享父进程的物理空间，且一定是保证子进程先运行，只有当子进程调用exec或者exit后父进程才能被调度运行，不会发生任何拷贝，如果调用exec后会创建新的物理空间。vfork子进程可能会修改或破坏掉父进程的数据，因此如果vfork后应当立即调用exec使父子进程互不干扰。

## 17、fork()子进程在哪里取指令执行exec系统调用

在fork之后exec之前父子进程的虚拟地址空间不同，但都指向同一块物理空间，所以此时子进程的代码段、数据段、堆栈都是使用父进程的。当父子进程中有更改数据段或堆栈的行为时，再为子进程的相应段分配物理空间，如果不是因为exec，内核会给子进程的数据段、堆栈段分配相应的物理空间，而代码段继续共享父进程的物理空间。如果使用exec，所有段都会单独分配物理空间。

## 18、fork出来的子进程和父进程有什么区别

fork返回值不同，父进程返回值大于0，子进程等于0。进程ID不同，子进程需要回收，否则会变成僵尸进程。

fork()使用了写时复制技术，初始时和父进程共享相同的物理空间，只有当发生段修改或者exec调用才分配新的内存空间，减少了创建新进程的开销。

vfork()也是用于创建进程的，与fork()不同的是，vfork()创建子进程后，除非子进程结束，否则父进程不能运行。

## 19、对于计算密集型线程如何优化

CPU有三级缓存，L1、L2和L3，L3是多核共享的，L1和L2是每个核心独占的。对于计算密集型任务而言，缓存命中率越高，性能自然也就越高，所以可以通过将线程绑定到固定核心上，来提高对L1和L2级缓存的命中率，从而提高性能。

## 20、如何优化IO密集型任务

IO密集型任务的特点是IO操作时间长，CPU空闲时间多，所以优化的方向就是使用多线程同时执行多个IO，因为任务越多CPU利用率就越高。

## 21、系统中文件描述符是如何工作的

Linux系统中一切都可以看成是文件，可分为：普通文件、目录文件、链接文件、设备文件等。为了避免每次操作文件时都需要去查找一遍文件的名字，操作系统会给每个打开的文件分配一个索引，这个索引就是文件描述符，它是一个非负整数，由于0，1，2被系统占用作为标准输入、标准输出和标准错误，所以文件描述符从3开始，通过索引去查找对应的文件能够加快查找速度。

Linux系统在内核为文件描述符维护了3个数据结构，一个是进程级别的文件描述符表，一个是系统级的文件描述符表，一个是文件级的i-node表。每一个进程中都会有一个PCB进程控制块，里面有一个文件描述符表，记录了该进程打开的文件对应的文件描述符。系统级的文件描述符表记录了每一个文件描述符的文件偏移、状态标志、i-node指针等信息。i-node表记录了文件类型、大小、时间戳等信息。

操作文件的过程首先是进程在PCB中的文件描述符表找到对应的文件描述符，通过其中的文件指针找到系统级文件描述符的位置，获得偏移量等信息（每个进程对应同一个文件偏移量是不同的，读写操作是独立的），再通过i-node指针找到文件，从而对文件进行操作。多个进程可以同时打开一个文件，对应系统级的文件描述符会记录有多少进程打开这个文件，只有当计数为0才会真正关闭这个文件，将对应的文件描述符条目删除。

## 22、父进程打开了文件描述符，fork子进程后，父进程关闭，子进程能否顺利读取文件

父进程fork子进程后，子进程继承了父进程的所有信息，包括文件描述符，以及文件偏移量，同时系统级的文件引用计数器也会加一，父进程关闭后只是系统级文件描述符计数减一，子进程仍然可以正常操作文件。

但是注意，如果父进程是在fork后再打开某个文件，那么父子进程的文件偏移是不一样的。

## 23、多线程中，在某个线程中fork一个子进程，子进程里面有几个线程（子进程会复制父进程的其他线程吗）

子进程中只有一个线程，fork的时候子进程不会复制父进程中的其他线程，只会复制当前线程，其他线程在子进程中全部终止执行并消失，但是子进程并不会进行资源回收，往往会导致子进程发生死锁或者内存泄漏。

## 24、进程的终止方式

+ 正常退出：多数进程是由于完成了工作而终止。当编译器完成了所给定程序的编译之后，编译器会执行一个系统调用告诉操作系统它完成了工作。这个调用在 UNIX 中是 `exit` ，在 Windows 中是 `ExitProcess`。面向屏幕中的软件也支持自愿终止操作。字处理软件、Internet 浏览器和类似的程序中总有一个供用户点击的图标或菜单项，用来通知进程删除它所打开的任何临时文件，然后终止。

+ 错误退出：一般是发生错误，但是给错误参数，让用户决定是退出还是重试。

+ 严重错误：进程终止的第三个原因是由进程引起的错误，通常是由于程序中的错误所导致的。例如，执行了一条非法指令，引用不存在的内存，或者除数是 0 等。在有些系统比如 UNIX 中，进程可以通知操作系统，它希望自行处理某种类型的错误，在这类错误中，进程会收到信号（中断），而不是在这类错误出现时直接终止进程。

+ 被其他进程杀死：第四个终止进程的原因是，某个进程执行系统调用告诉操作系统杀死某个进程。在 UNIX 中，这个系统调用是 kill。在 Win32 中对应的函数是 `TerminateProcess`（注意不是系统调用）。

## 25、评价调度程序的指标有哪些

+ CPU使用率：CPU正在执行任务的时间百分比；

+ 等待时间：进程轮流执行的时间，也就是进程切换的等待时间；

+ 吞吐量：单位时间内完成进程的数量；

+ 响应时间：就是从提交流程到获得有用输出所经过的时间；

+ 周转时间：从提交流程到完成所有的时间。

## 26、什么是RR调度算法(时间片轮转法)

+ **RR(round-robin)** 调度算法主要针对分时系统，RR 的调度算法会把时间片以相同的部分并循环的分配给每个进程，RR 调度算法没有优先级的概念。这种算法的实现比较简单，而且每个线程都会占有时间片，并不存在线程饥饿的问题。

## 27、线程分类有哪些

从线程的运行空间来说，分为用户级线程（user-level thread, ULT）和内核级线程（kernel-level, KLT）。

+ **内核级线程**：这类线程依赖于内核，又称为内核支持的线程或轻量级进程。无论是在用户程序中的线程还是系统进程中的线程，它们的创建、撤销和切换都由内核实现。比如英特尔i5-8250U是4核8线程，这里的线程就是内核级线程。
+ **用户级线程**：它仅存在于用户级中，这种线程是**不依赖于操作系统核心**的。应用进程利用**线程库来完成其创建和管理**，速度比较快，**操作系统内核无法感知用户级线程的存在**。

## 28、进程有哪些状态

进程一共有`5`种状态，分别是创建、就绪、运行（执行）、阻塞、终止，一般在除了创建和终止外三个状态进行转换。

- 运行状态就是进程正在`CPU`上运行。在单处理机环境下，每一时刻最多只有一个进程处于运行状态。

- 就绪状态就是说进程已处于准备运行的状态，即进程获得了除`CPU`之外的一切所需资源，一旦得到`CPU`即可运行。

- 阻塞状态就是进程正在等待某一事件而暂停运行，比如等待某资源为可用或等待`I/O`完成。即使`CPU`空闲，该进程也不能运行。

**运行态→阻塞态**：往往是由于等待外设，等待主存等资源分配或等待人工干预而引起的。
**阻塞态→就绪态**：则是等待的条件已满足，只需分配到处理器后就能运行。
**运行态→就绪态**：不是由于自身原因，而是由外界原因使运行状态的进程让出处理器，这时候就变成就绪态。例如时间片用完，或有更高优先级的进程来抢占处理器等。
**就绪态→运行态**：系统按某种策略选中就绪队列中的一个进程占用处理器，此时就变成了运行态。

# 内存相关

## 1、什么是虚拟内存？(操作系统的内存管理)

**虚拟内存是计算机系统内存管理的一种技术。**为了多进程环境下每个进程能够同时运行，且互不干扰，操作系统为每个进程分配一套虚拟地址空间，操作系统将虚拟地址映射到物理内存空间。为了使得大型程序能够运行，虚拟地址不仅仅只映射到物理内存，同时还映射到部分磁盘空间，这样程序逻辑上看能够拥有比物理内存空间更大的空间，进程很久没有用到的数据被操作系统移动到磁盘，需要用到时再交换到物理内存，这些操作都是计算机自动完成的。

虚拟空间地址需要映射到物理地址，通常有分段和分页两种映射方式，也可以两者结合。内存分段是根据程序的逻辑，分成了栈段、堆段、数据段、代码段等，这样可以分离出不同属性的段，同时每段是一个连续的空间。但是每段的大小不是统一的，这会产生内存碎片化和内存交换效率低的问题。

为了解决这两个问题，出现了内存分页的方法，把虚拟空间和物理空间分成固定大小的页，如Linux系统中，每页的大小是4KB，由于页的大小是固定的，就不会产生细小的内存碎片。同时在内存交换的时候，只需要交换没有用到的那些页，大大提高了内存交换的效率。

但是简单分页会产生页表过大的问题，于是产生了多级页表，解决了页表空间开销太大的问题，但是由于CPU寻址时需要多层页表的参与，加大了时间的开销，于是在CPU芯片中加入了TLB，负责缓存最近常被访问的页表项，大大提高了地址转换的速度。

Linux系统主要采用的是分页管理，但是由于Intel处理器的发展史，Linux系统无法避免分段管理。于是Linux就把所有段的基地址设为0，也就意味着所有程序的地址空间都是线性地址空间（虚拟地址），相当于屏蔽了CPU逻辑地址的概念，所以段只被用于访问控制和内存保护。  

## 2、什么是内存对齐？为什么要做内存对齐

在计算机中，内存是按字节划分的，而CPU在读取数据时，并不是一个字节一个字节的读取，实际上是按块的大小读取，块大小可以是2，4，8，16等等，称为内存访问粒度，内存对齐则是将特定的数据类型按照一定的规则摆放在内存上，具体规则是按照变量的声明顺序，依次安排内存，其偏移量为变量大小的整数倍。之所以要做内存对齐主要原因有两个：

+ 平台原因(移植原因)：不是所有的硬件平台都能访问任意地址上的任意数据的；某些硬件平台只能在某些地址处取某些特定类型的数据，否则抛出硬件异常。

+ 性能原因：数据结构(尤其是栈)应该尽可能地在自然边界上对齐。原因在于，为了访问未对齐的内存，处理器需要作两次内存访问；而对齐的内存访问仅需要一次访问。

内存对齐的例子：

```c++
typedef struct {
  	int a;
    double b;
    short c;
}A;

typedef struct {
    int a;
    short b;
    double c;
}B;
// sizeof(A) = 24, sizeof(B) = 16;
// 对于A来说，a占用0-3，共4字节，b是double类型，偏移需要是8的整数倍，因此占用8-15共8字节，4-7字节填充，
// c是short，偏移量需要是2的整数倍，所以占用16-17共两个字节，加起来一共是20字节，结构体总字节数需要是最
// 长类型即double的整数倍，那么需要填充为24字节。对于B来说，a占用0-3，共4字节，b占用4-5共两个字节，c占用
// 8-15共8个字节，合计为16字节，是8的整数倍，顾B占用16字节。
```

## 3、怎么判断是大端还是小端

字节序是对象在内存中存储的方式，大端即为最高有效位在前面（低地址存放高字节），小端即为最低有效位在前面（低地址存放低字节）。
判断大小端的方法，使用一个union数据结构：

```c++
union{
	int a;
	char c;
}un;
un.a = 1;
if(un.c == 0) cout<<"大端";
if(un.c == 1) cout<<"小端";
```

## 4、进程经常在内存和磁盘间换入换出，怎么样保证每次换入换出后进程中的指令跳转地址不会混乱

程序运行时会重定位地址，每段进程换入内存运行时都会在PCB中保存该进程的基地址，跳转地址指令一般都是偏移地址，跳转的时候会取出PCB中的基地址加上偏移地址得到需要跳转的地址，PCB中的LDT表保存着该进程各个段的基地址。

## 5、如何以文件的形式从磁盘读取信息

文件是以字符流的形式存在，磁盘是以多个扇区组成的磁盘块读取信息，所以想要将字符流和磁盘块对应起来，第一种方法是，文件的FCB中保存磁盘0-99的起始位置，比如磁盘块6，那么读取字符流200-212，就是用200除以一个磁盘块的大小，然后加上其实磁盘块号就可以。但是这种字符流在磁盘块中按照磁盘块的顺序保存，不能动态增加磁盘块，因为按顺序增加磁盘块时后面的磁盘块可能被利用了导致必须像vector扩容那样重新寻找一块更大的连续磁盘块空间，因此出现了索引磁盘块的形式。FCB中保存磁盘0-99的起始磁盘块指向另一个磁盘块，代表100-199的字符流位置，这样以链表的形式存储字符流，增加磁盘块随便找一个空闲块判指向它即可，但是这种方式也有缺点，就是读取的时候必须从头遍历，效率很低。为了可以既方便存储读取，又方便动态扩容，出现了索引形式。文件的FCB中保存磁盘块目录的位置，该磁盘块目录分别指向0-99，100-199等磁盘块的位置，每次先找到目录，再根据目录找到需要的字符流，存储读取很快，扩容也非常快，直接找一个只想空间存储需要的字符流大小就行。

## 6、为什么内存比磁快

硬盘是有机械结构的，磁头要运动到相应的位置，转片需要转动才能读取数据。

内存是没有机械结构的，是直接通过电信号，电的速度要比机械运动快得多，内存的速度自然比磁盘块。

## 7、空闲分区表和空闲分区链

两个都是操作系统内存分配里面的概念，操作系统内存的动态分配，指的是当有新的作业到来，需要按照作业的内存要求找到空闲分区分配给作业，随着作业的装入、撤离，主存空间会被分割成许多分区，所以要想找到空闲分区，需要有一张表来记录空闲分区的信息，这就是空闲分区表。空闲分区表由一个个表目组成，每一个表目记录一个空闲分区信息，包括分区号、分区的大小、起始地址等等。空闲分区表类似于一个目录，为了方便分区的分配，将每一个空闲分区通过指针连接起来，形成一个双向链表，这就是空闲分区链。

## 8、计算机内存分配算法有哪些

+ **首次适应算法（First Fit)：**从空闲分区表的第一个表目起查找该表，把最先能够满足要求的空闲区分配给作业，这种方法的目的在于减少查找时间。为适应这种算法，空闲分区表（空闲区链）中的空闲分区要按地址由低到高进行排序。该算法优先使用低址部分空闲区，在低址空间造成许多小的空闲区，在高地址空间保留大的空闲区。

+ **最佳适应算法(Best Fit)：**从全部空闲区中找出能满足作业要求的、且大小最小的空闲分区，这种方法能使碎片尽量小。为适应此算法，空闲分区表（空闲区链）中的空闲分区要按从小到大进行排序，自表头开始查找到第一个满足要求的自由分区分配。该算法保留大的空闲区，但造成许多小的空闲区。

+ **最差适应算法(WorsFit)：**从全部空闲区中找出能满足作业要求的、且大小最大的空闲分区，从而使链表中的结点大小趋于均匀，适用于请求分配的内存大小范围较窄的系统。为适应此算法，空闲分区表（空闲区链）中的空闲分区按大小从大到小进行排序，自表头开始查找到第一个满足要求的自由分区分配。该算法保留小的空闲区，尽量减少小的碎片产生。

+ **伙伴算法(Buddy)：**使用二进制优化的思想，将内存以2的幂为单位进行分配，合并时只能合并是伙伴的内存块，两块内存是伙伴需要满足三个条件：大小相等、地址连续、两个内存块分裂自同一个父块，也就是低地址的内存块首地址和父块的首地址对齐。伙伴算法是一个精妙的内存管理算法，其优点是快速搜索合并（O(logN)时间复杂度）以及低外部碎片（最佳适配best-fit）；其缺点是内部碎片，因为按2的幂划分块，如果碰上66单位大小，那么必须划分128单位大小的块。

## 9、什么是外部碎片和内部碎片

+ 内部碎片：已经对分配出去，却不能被利用的内存空间称为内部碎片，比如伙伴算法中，一个进程需要30KB的内存，但是按照2的幂次方，需要分配32KB内存，多余的2KB就是内部碎片。

+ 外部碎片：指的是由于内存太小，无法将其分配出去的内存空间。

## 10、什么是按需分页

在操作系统中，进程是以页为单位加载到内存中的，按需分页是一种`虚拟内存`的管理方式。在使用请求分页的系统中，只有在尝试访问页面所在的磁盘并且该页面尚未在内存中时，也就发生了`缺页异常`，操作系统才会将磁盘页面复制到内存中。

## 11、物理地址、逻辑地址、有效地址、线性地址、虚拟地址的区别

物理地址就是内存中真正的地址，它就相当于是你家的门牌号，你家就肯定有这个门牌号，具有唯一性。**不管哪种地址，最终都会映射为物理地址**。

在`实模式`下，段基址 + 段内偏移经过地址加法器的处理，经过地址总线传输，最终也会转换为`物理地址`。

但是在`保护模式`下，段基址 + 段内偏移被称为`线性地址`，不过此时的段基址不能称为真正的地址，而是会被称作为一个`选择子`的东西，选择子就是个索引，相当于数组的下标，通过这个索引能够在 GDT 中找到相应的段描述符，段描述符记录了**段的起始、段的大小**等信息，这样便得到了基地址。如果此时没有开启内存分页功能，那么这个线性地址可以直接当做物理地址来使用，直接访问内存。如果开启了分页功能，那么这个线性地址又多了一个名字，这个名字就是`虚拟地址`。

不论在实模式还是保护模式下，段内偏移地址都叫做`有效地址`。有效抵制也是逻辑地址。

线性地址可以看作是`虚拟地址`，虚拟地址不是真正的物理地址，但是虚拟地址会最终被映射为物理地址。下面是虚拟地址 -> 物理地址的映射。

## 12、空闲内存的管理方式

+ 位图管理：内存可能被分为小到几个字节大到几千字节的分配单元，每个分配单元对应位图中的一位，0表示空闲，1表示占用。分配单元越小，位图就越大，在给进程分配内存时，需要查找位图找到连续的可用内存，是一个比较耗时的过程。

+ 另一种方法是使用空闲链表法，链表的节点维护了已分配内存和空闲内存的信息，同时他们是按照内存地址连续的首尾相接，这样对于查找和释放状态的更改就会比较方便。

## 13、页面置换算法

在地址映射过程中，如果在页面中发现所要访问的页面不在内存中，那么就会产生一条缺页中断。当发生缺页中断时，如果操作系统内存中没有空闲页面，那么操作系统必须在内存选择一个页面将其移出内存，以便为即将调入的页面让出空间。而用来选择淘汰哪一页的规则叫做页面置换算法。

+ **最优页面置换算法：**在当前页面中置换最后要访问的页面。不幸的是，没有办法来判定哪个页面是最后一个要访问的，`因此实际上该算法不能使用`。然而，它可以作为衡量其他算法的标准。

+ **最近未使用页面置换算法（NRU）**：当页面被访问（读或写）时设置R位，页面被写入（修改）时设置M位。当启动一个进程时，它的所有页面的两个位都由操作系统设为0，R位被定期地（比如在每次时钟中断时）清零，以区别最近没有被访问的页面和被访问的页面。当发生缺页中断时，操作系统检查所有的页面并根据它们当前的R位和M位的值，把它们分为4类：

  第0类：没有被访问，没有被修改。
  第1类：没有被访问，已被修改（M）。
  第2类：已被访问，没有被修改（R）。
  第3类：已被访问，已被修改（RM）。
  NRU(Not Recently Used)算法随机地从类编号最小的非空类中挑选一个页面淘汰。在一个时间滴答中（大约20ms）淘汰一个没有被访问的已修改页面要比淘汰一个被频繁使用的“干净”页面好。NRU算法的主要优点是易于理解和能够有效地被实现，虽然它的性能不是最好的，但是已经够用了。

+ **先进先出页面置换算法（FIFO）**：开销同样较小的FIFO算法，最新进入的页面放在表尾，最早进入的页面放在表头。当缺页中断时，淘汰表头的页面并把新调入的页面加到表尾。这种算法的缺点是可能会把有用的页面淘汰掉。

+ **第二次机会页面置换算法（SC）**：算法是对 FIFO 的一个修改，它会在删除页面之前检查这个页面是否仍在使用。如果页面正在使用，就会进行保留，这个改进大大提高了性能。

+ **时钟页面置换算法（CLOCK）**：对第二次机会算法的改进，第二次机会算法经常要在链表中移动页面，既降低了效率又不是很必要。一个更好的做法就是把所有的页面都保存在一个类似钟面的环形链表中，一个表指针指向最老的页面。当发生缺页中断时，首先检查表指针指向的页面，如果它的R位是0就淘汰该页面，并把新的页面插入这个位置，然后把表指针前移一个位置。如果R位是1就清除R位并把表指针前移一个位置；重复这个过程一直到找到一个R位为0的页面为止。 

+ **最近最少使用页面置换算法（LRU）**：LRU理论上是可以实现的，但是代价很高。维护一个所有页面的链表，最近最多使用的页面在表头，最近最少使用的页面在表尾。

+ **最不常用页面置换算法（NFU）**：用一个软件模拟LRU，该算法将每个页面与一个软件计数器相关联。计数器的初值为0。每次时钟中断时，由操作系统扫描内存中所有的页面，将每个页面的R位（它是0或1）加到它的计数器上。这个计数器大体上跟踪了各个页面被访问的频繁程度。发生缺页中断时，则置换计数器值最小的页面。
  NFU的缺点是它不从不忘记任何事，比如一个页面之前频繁被访问，导致这个它的计数器很大，但是后来它不被访问了，而它的计数器的值还是很大，所以它一直不会被置换出去。

+ **老化算法：**老化算法是对NFU算法的修改，其修改包括两个部分，首先，在R位被加进之前将计数器右移一位，其次，将R位加到计数器最左端的位而不是最右端的位。老化算法中的计数器只有有限位数，如果时钟滴答是20ms，8位一般是够用的。假如一个页面160ms没有被访问过，那么它很可能并不重要。

## 14、什么是缓冲区

缓冲区（buffer），它是内存空间的一部分。也就是说，在内存空间中预留了一定的存储空间，这些存储空间用来缓冲输入或输出的数据，这部分预留的空间就叫做缓冲区，显然缓冲区是具有一定大小的。缓冲区根据其对应的是输入设备还是输出设备，分为输入缓冲区和输出缓冲区。

## 15、为什么要引入缓冲区

高速设备与低速设备的不匹配，势必会让高速设备花时间等待低速设备，我们可以在这两者之间设立一个缓冲区。所以缓冲区的作用：

+ 可以解除两者的制约关系，数据可以直接送往缓冲区，高速设备不用再等待低速设备，提高了计算机的效率。例如：我们使用打印机打印文档，由于打印机的打印速度相对较慢，我们先把文档输出到打印机相应的缓冲区，打印机再自行逐步打印，这时我们的CPU可以处理别的事情。
+ 可以减少数据的读写次数，如果每次数据只传输一点数据，就需要传送很多次，这样会浪费很多时间，因为开始读写与终止读写所需要的时间很长，如果将数据送往缓冲区，待缓冲区满后再进行传送会大大减少读写次数，这样就可以节省很多时间。例如：我们想将数据写入到磁盘中，不是立马将数据写到磁盘中，而是先输入缓冲区中，当缓冲区满了以后，再将数据写入到磁盘中，这样就可以减少磁盘的读写次数，不然磁盘很容易坏掉。

## 16、缓冲区的类型

+ **全缓冲：**在这种情况下，当填满标准I/O缓存后才进行实际I/O操作。全缓冲的典型代表是对磁盘文件的读写。
+ **行缓冲：**在这种情况下，当在输入和输出中遇到换行符时，执行真正的I/O操作。这时，我们输入的字符先存放在缓冲区，等按下回车键换行时才进行实际的I/O操作。典型代表是键盘输入数据。
+ **不带缓冲：**也就是不进行缓冲，标准出错情况stderr是典型代表，这使得出错信息可以直接尽快地显示出来。

## 17、什么时候会引起缓冲区刷新

缓冲区刷新就是要把原来的数据更新，就做刷新，两种情况会引起缓冲区刷新：

+ 缓冲区满。
+ 文件关闭。

## 18、什么是缓存（Cache）

CPU的Cache，它中文名称是高速缓冲存储器，读写速度很快，几乎与CPU一样。由于CPU的运算速度太快，内存的数据存取速度无法跟上CPU的速度，所以在cpu与内存间设置了cache为cpu的数据快取区。当计算机执行程序时，数据与地址管理部件会预测可能要用到的数据和指令，并将这些数据和指令预先从内存中读出送到Cache。一旦需要时，先检查Cache，若有就从Cache中读取，若无再访问内存，现在的CPU还有一级cache，二级cache。简单来说，Cache就是用来解决CPU与内存之间速度不匹配的问题，避免内存与辅助内存频繁存取数据，这样就提高了系统的执行效率。

磁盘也有cache,硬盘的cache作用就类似于CPU的cache，它解决了总线接口的高速需求和读写硬盘的矛盾以及对某些扇区的反复读取。

浏览器缓存（Browser Caching）是为了节约网络的资源加速浏览，浏览器在用户磁盘上对最近请求过的文档进行存储，当访问者再次请求这个页面时，浏览器就可以从本地磁盘显示文档，这样就可以加速页面的阅览，并且可以减少服务器的压力。这个过程与下载非常类似，不过下载是用户的主动过程，并且下载的数据一般是长时间保存，游览器的缓存的数据只是短时间保存，可以人为的清空。

## 19、缓冲（buffer）和缓存（cache）的区别

Buffer的核心作用是用来缓冲，缓和冲击。比如你每秒要写100次硬盘，对系统冲击很大，浪费了大量时间在忙着处理开始写和结束写这两件事嘛。用个buffer暂存起来，变成每10秒写一次硬盘，对系统的冲击就很小，写入效率高了，极大缓和了冲击。

Cache的核心作用是加快取用的速度。比如你一个很复杂的计算做完了，下次还要用结果，就把结果放手边一个好拿的地方存着，下次不用再算了，加快了数据取用的速度。

# 锁相关

## 1、线程同步的方式有哪些(锁)

线程同步通过加锁实现，一般有互斥锁、条件锁、自旋锁、读写锁、信号量等。

## 2、**互斥锁（互斥量）**

互斥锁引入对象互斥的概念，来保证共享数据操作的完整性。每个对象都对应一个可称为“互斥锁”的标记，这个标记用来保证在任一时刻，只有一个线程访问该对象。当已经有一个线程获得互斥锁，另一个线程想要获取该锁时会获取失败，进入睡眠等待唤醒。一个线程也可以不去加锁就访问该数据，但是可能造成数据混乱，因此互斥锁是建议锁。

互斥锁加锁失败后会释放CPU资源，由用户态切换到内核态，内核把线程从运行设为睡眠；当锁释放后，内核会把之前睡眠的线程变为就绪，继续竞争锁资源。因此会有两次线程上下文切换的成本。

## 3、条件锁（条件变量）

条件锁就是所谓的条件变量，某一个线程在等待某个条件满足时一直处于阻塞状态，该条件以条件变量的方式保存，一旦条件满足则唤醒等待该条件的线程。例如线程池中，工作线程只有当任务队列不为空时才执行任务，当任务队列为空时就阻塞等待，条件变量就是任务队列的任务个数，当任务个数不为0，即有任务时唤醒工作线程处理工作。为了防止竞争，条件变量总是和互斥量结合使用。

## 4、自旋锁

自旋锁和互斥锁类似，它们都是为了解决对某项资源的互斥使用产生的，但是两者的调度机制不同。对于互斥锁，如果资源已经被占用，资源申请者只能进入睡眠。但是自旋锁不会引起调度者的睡眠，调度者会一直循环查看该自旋锁是否已经被释放，“自旋”一词也就是这么来的。

## 5、读写锁

读写锁是一种特殊的自旋锁，但是它把共享资源的访问者划分成了读者和写者，读者只能对资源进行读访问，写者只能对资源进行写访问，相对于普通自旋锁而言，这种方式提高了并发性。因为在多处理器系统中，它允许同时有多个读者来访问共享资源，写者是排他性的，也就是说一个读写锁可以同时有多个读者。

如果读写锁当前没有读者和写者，那么写者可以立即获取读写锁，否则必须自旋等待，直到没有读者和写者。如果读写锁没有写者，那么读者可以立即获得读写锁，否则必须自旋等待。

## 6、信号量

信号量 和互斥锁的区别在于：互斥锁只允许一个线程进入临界区，信号量允许多个线程同时进入临界区。可以这样理解，互斥锁使用对同一个资源的互斥的方式达到线程同步的目的，信号量可以同步多个资源以达到线程同步。

## 7、互斥锁和自旋锁的区别

互斥锁和自旋锁都是用于线程互斥的访问资源，互斥锁在竞争锁失败后会立即释放CPU资源，由用户态切换到内核态，进入睡眠，直到锁资源被释放后从睡眠变为就绪，继续竞争锁资源，因此会有两次线程上下文切换。自旋锁在竞争锁资源失败后不会切换到内核态，会一直循环等待判断锁资源是否释放。

如果锁资源的竞争不激烈且线程持有锁资源，那么自旋锁只需要做短时间的等待，能够避免用户态切换到内核态的消耗；反之如果锁资源竞争很激烈，线程持有锁资源的时间很长，自旋锁会占用大量的CPU资源，这种情况选择互斥锁比较好。

## 8、互斥锁和读写锁的区别

读写锁比互斥锁有更高的并行性，一个线程被互斥锁加锁后，其他线程必须等待该互斥锁解锁后才能加锁，而读写锁的读模式允许多个线程同时进行读加锁。

## 9、什么是死锁，产生死锁的原因

死锁是指多个线程或者进程因竞争资源而造成的一种僵局（互相等待），如无外力的作用，这些进程都将无法向前推进。

产生死锁的原因：

+ 因为系统资源不足；资源分配不当；

+ 进程推进顺序不当，资源请求和释放的顺序不当，例如P1已经占有F1，P2已经占有F2，若P1此时去请求F2，P2请求F1，则P1和P2都会因为F1，F2已经被占用而阻塞，两个进程都无法继续向前推进。

+ 信号量使用不当造成死锁。进程间彼此相互等待对方发消息，结果是都无法向前推进。例如进程P1阻塞等待P2发消息，进程P2也在阻塞等待P1发消息，结果两个都在相互等待造成死锁。

总结下来满足四个条件会产生死锁：

+ 互斥条件：一个资源每次只能被一个进程使用。
+ 请求与保持条件：一个进程因请求资源而阻塞时，对已获得资源保持不放。
+ 不剥夺条件：进程获得的资源，在未完全使用完之前，不能强行剥夺。
+ 循环等待条件：若干进程之间形成一种头尾相接的环形等待资源关系。

## 10、解决死锁的方法

+ 重新启动：是最简单、最常用的死锁消除方法，但代价很大，因为在此之前所有进程已经完成的计算工作都将付之东流，不仅包括死锁的全部进程，也包括未参与死锁的全部进程；

+ 剥夺资源：从其他进程剥夺足够数量的资源给死锁进程，以解除死锁状态；

+ 撤销进程：直接撤销死锁进程或者撤销代价最小的进程，直至有足够的资源可以使用，死锁状态消失为止。代价指的是优先级、运行代价、进程重要性和价值等。

## 11、预防死锁的方法

由于互斥条件是非共享资源所必须的，不仅不能改变，还应加以保证，所以预防死锁主要通过破坏其他三个条件实现。

+ 破坏不可抢占条件

当一个已经持有一些资源的进程提出新的资源请求没有得到满足时，他必须释放已经占有的资源，待以后需要的时候重新申请。这意味着进程已经占有的资源会被短暂释放或者说被其他进程抢占了。这种方法实现起来比较复杂，且代价比较大。释放已经保持的资源很可能会导致进程之前的工作失效，反复地申请和释放资源会导致进程的执行被无限推迟，不仅会延长进程的周转周期，还会影响吞吐量。

+ 破环占有并等待条件：
  + 方法1、所有进程开始运行前，必须一次性地申请其在整个运行过程中所需要用到的全部资源。优点是实现简单且安全，缺点是因为某项资源不满足，进程无法启动，而其他已经满足了资源也不会得到利用，严重降低了资源的利用率，造成了资源浪费。进程饥饿现象。
  + 方法2、对第一种方法的改进，允许进程只获得运行初期需要的资源，在运行过程中逐步释放掉已经使用完成的资源，再去请求新资源，提高了资源利用率，减少了进程饥饿现象。

+ 破环循环等待条件

为每个资源赋予一个编号，每个进程按编号递增的顺序请求资源，释放则相反，破坏了循环等待条件。

## 12、检测死锁的方法

在锁类中记录当前进程的ID及希望请求的资源被占用的进程ID，然后判断它们的ID是否形成一个循环就能判断是否发生死锁。

## 13、进程间通信方式有哪些（IPC方式）

进程之间的通信方式主要有六种，包括**管道，信号量，消息队列，信号，共享内存，套接字**。

+ 管道：管道这种通讯方式有两种限制，一是半双工的通信，数据只能单向流动，二是只能在具有亲缘关系的进程间使用。进程的亲缘关系通常是指父子进程关系。

  管道可以分为两类：匿名管道和命名管道。匿名管道是单向的，只能在有亲缘关系的进程间通信；命名管道以磁盘文件的方式存在，可以实现本机任意两个进程通信。

+ 信号量：信号量是一个**计数器**，可以用来控制多个进程对共享资源的访问。它常作为一种**锁机制**，防止某进程正在访问共享资源时，其他进程也访问该资源。因此，主要作为进程间以及同一进程内不同线程之间的同步手段。

+ 信号：信号是一种比较复杂的通信方式，信号可以在任何时候发给某一进程，而无需知道该进程的状态。

+ 共享内存：共享内存就是映射一段能被其他进程所访问的内存，这段共享内存由一个进程创建，但多个进程都可以访问。共享内存是最快的 IPC 方式，它是针对其他进程间通信方式运行效率低而专门设计的。它往往与其他通信机制，如信号量，配合使用，来实现进程间的同步和通信。

+ 消息队列：消息队列是消息的链接表，包括Posix消息队列和System V消息队列。有足够权限的进程可以向队列中添加消息，被赋予读权限的进程则可以读走队列中的消息。消息队列克服了信号承载信息量少，管道只能承载无格式字节流以及缓冲区大小受限等缺点。
  
+ 套接字：套接口也是一种进程间通信机制，与其他通信机制不同的是，它可用于不同设备及其间的进程通信。

## 14、Linux系统中常用的信号有哪些

+ （1）**SIGHUP**：用户从终端注销，所有已启动进程都将收到该进程。系统缺省状态下对该信号的处理是终止进程。

+ （2）**SIGINT**：程序终止信号。程序运行过程中，按`Ctrl+C`键将产生该信号。

+ （3）**SIGQUIT**：程序退出信号。程序运行过程中，按`Ctrl+\\`键将产生该信号。

+ （4）**SIGBUS和SIGSEGV**：进程访问非法地址。

+ （5）**SIGFPE**：运算中出现致命错误，如除零操作、数据溢出等。

+ （6）**SIGKILL**：用户终止进程执行信号。shell下执行`kill -9`发送该信号。

+ （7）**SIGTERM**：结束进程信号。shell下执行`kill 进程pid`发送该信号。

+ （8）**SIGALRM**：定时器信号。

+ （9）**SIGCLD**：子进程退出信号。如果其父进程没有忽略该信号也没有处理该信号，则子进程退出后将形成僵尸进程。

## 15、什么是临界区

临界区指的是一个访问共用资源的程序片段（例如：共用设备或是共用存储器），而这些共用资源又无法同时被多个线程访问。当有线程进入临界区时，其他线程必须等待，使得共用资源能够被互斥使用。

## 16、临界区和互斥量的区别

临界区是通过对多线程的串行化来确保资源的共享是安全的，在任意一个时刻只允许一个线程对共享资源进行访问，如果多个线程试图同时访问临界区，其他线程将被挂起，它的速度块，但是只能用于同步本进程内的线程。

互斥量和临界区很相似，只有拥有互斥对象的线程才具有访问资源的权限，由于互斥对象只有一个，因此决定了任何情况下都不会有多个线程同时访问共享资源。但是互斥量比临界区复杂一些，它可以跨越进程使用，但是速度也更慢一些，所以如果只是为了在同一个进程中进行同步，使用临界区速度上会更有优势。

+ 临界区只能用于对象在同一进程间的互斥访问；互斥量可以用于进程间或线程间的互斥访问。

+ 临界区是非内核对象，在用户态进行操作，速度快；互斥量是内核对象，在内核态进行操作，需要进行上下文切换，速度较慢。

+ 临界区在Linux和Windows平台都能使用，互斥量只能在Linux使用。

