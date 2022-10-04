---
icon: note
date: 2022-01-11
category:
  - 面经汇总
tag:
  - 设计模式面试题
---

# 设计模式

## 	1、什么是设计模式？

> 设计模式是一套被反复使用、多数人知晓的、经过分类编目的代码设计经验总结。使用设计模式是为了可重用代码、让代码更容易被他人理解，保证代码的可靠性、程序的可复用性。

## 2、设计模式分类有哪些？

> - 创建型模式，共五种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。
> - 结构型模式，共七种：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。
> - 行为型模式，共十一种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。

## 3、设计模式的六大原则？

>- 开放封闭原则（Open-Closed-Principle）：一个软件实体应该对扩展开放，对修改关闭。即尽量通过扩展软件实体来解决需求变化，而不是通过修改已有代码来完成，以提高项目的稳定性和灵活性。
>- 里氏代换原则（Liskow-Substitution-Principle）：所有引用基类的地方，都必须能透明地使用其子类对象。也就是说一个软件实体里，把引用父类的地方替换成它的子类，对程序不会产生影响。 
>- 依赖倒转原则（Dependency-Inversion-Principle）：要针对接口编程，而不是针对实现编程。在程序中传递参数时或在关联关系中，尽量引用层次较高的抽象层类。这也是开放封闭原则的基础，对接口编程，依赖于抽象不依赖于具体。
>- 接口隔离原则：使用多个接口比使用单个接口要好。不应当将多个接口汇总在一起，尽量拆分开，可以降低依赖降低耦合。
>- 单一职责原则：一个方法或一个类只负责一件事，可以降低耦合，提高可读性，增加程序的可扩展性和可维护性。
>- 迪米特原则：一个对象应当尽可能少地了解其他对象，即一个类应该尽量减少对其他类的依赖。

## 4、单例模式

>- 定义：保证整个系统中一个类只有一个对象的实例，实现这种功能的方式就叫单例模式。
>- 优点：提供了对唯一实例的受控访问；由于只存在一个对象实例，节约了系统资源，对于一些需要频繁创建和销毁的对象使用单例模式可以提高系统性能；允许可变数目的实例。
>- 缺点：不适用于变化的对象；由于没有抽象层，扩展比较困难；一定程度上违背了“单一职责原则”。
>- 懒汉模式，只有在需要使用该实例时才会去创建，可以实现延迟加载，节约内存空间，但是需要考虑线程安全问题。
>- 饿汉模式，系统运行时就创建实例，需要时直接调用，本身是线程安全的，但是不能实现延迟加载，不管将来使不使用都会占据内存空间。

### 线程不安全的懒汉模式实现

```c++
class Single
{
public:
    static Single* getSingleInstance()
    {
        if (m_instance == nullptr)
        {
            m_instance = new Single();
            cout << "This is the once" << endl;
        }
        else
        {
            cout << "Instance exist" << endl;
        }
        return m_instance;
    }
private:
    Single()
    {
        cout << "Call Single()" << end;
    }
    ~Single()
    {
        cout << "Call ~Single()" << endl;
    }
private:
    static Single* m_instance;
}

// 先初始化为空，使用的时候再去创建
Single* Single::m_instance = nullptr;
// 线程安全问题：如果此时有多个线程同时调用getSingleInstance获取实例，
// 由于没有加锁，多个线程可能同时判断m_instance为空，就会构造出多个实例，
// 就不满足单例模式要求了，解决的办法自然是加锁。
```

### 线程安全的懒汉模式

```c++
class Single
{
public:
    static Single* getSingleInstance()
    {
        pthread_mutex_lock(&m_mutex);
        if (m_instance == nullptr)
        {
            m_instance = new Single();
            cout << "This is the once" << endl;
        }
        else
        {
            cout << "Instance exist" << endl;
        }
        pthread_mutex_unlock(&m_mutex);
        return m_instance;
    }
private:
    Single()
    {
        pthread_mutex_init(&mutex);
        cout << "Call Single()" << end;
    }
    ~Single()
    {
        cout << "Call ~Single()" << endl;
    }
private:
    static Single* m_instance;
    static pthread_mutex_t m_mutex;
}

// 先初始化为空，使用的时候再去创建
pthread_mutex_t Single::m_mutex;
Single* Single::m_instance = nullptr;
// 锁资源性能分析：加了锁能够解决线程安全问题，但是上述实现每次获取实例都会加锁解锁，
// 频繁地加锁解锁对性能有很大影响，由于懒汉模式第一次调用后实例就已经存在，后面再次
// 调用实际上就不需要创建新实例，所以是线程安全的，不需要加锁，所以可以修改为只在第
// 一次调用的时候加锁。
```

### 懒汉模式线程安全锁资源优化

```c++
class Single
{
public:
    static Single* getSingleInstance()
    {
        if (m_instance == nullptr)
        {
        	pthread_mutex_lock(&m_mutex);
        	if (m_instance == nullptr)
        	{
            	m_instance = new Single();
            	cout << "This is the once" << endl;
        	}
        	else
        	{
            	cout << "Instance exist" << endl;
        	}  
        	pthread_mutex_unlock(&m_mutex); 
        }
        return m_instance;
    }
private:
    Single()
    {
        pthread_mutex_init(&mutex);
        cout << "Call Single()" << end;
    }
    ~Single()
    {
        cout << "Call ~Single()" << endl;
    }
private:
    static Single* m_instance;
    static pthread_mutex_t m_mutex;
}

// 先初始化为空，使用的时候再去创建
pthread_mutex_t Single::m_mutex;
Single* Single::m_instance = nullptr;
```

### 饿汉模式实现

```c++
class single
{
public:
    static Single* getSingleInstance()
    {
        return m_instance;
    }
private:
    Single()
    {
        cout << "Call Single()" << endl;
    }
    ~Single()
    {
        cout << "Call ~Single()" << endl;
    }
private:
    static Single *m_instance;
}

// 程序运行时就构造初始化
Single* Single::m_instance = new Single;
```

## 4、简单工厂模式

>工厂模式是创建型设计模式，作用是封装了类对象的实例化过程，工厂模式可以分为简单工厂模式、工厂模式和抽象工厂模式。其中最简单的就是简单工厂模式。
>
>简单工厂模式将多个对象的实例化封装成一个工厂类，根据客户端传入的对象名称生成对应的实例，优点是实现简单，缺点是不符合开放封闭原则，添加新的类时需要通过修改原始代码。

## 5、工厂模式

>工厂模式是在简单工厂模式上的进一步抽象，简单工厂模式破坏了开放封闭原则，添加新类的时候需要修改原始代码，工厂模式设计一个抽象工厂类，但是具体实例生成过程交给了对应的子工厂，添加新类的时候只需要添加对应的子工厂，这样既保留了扩展性也保持了封闭性。简单点说工厂模式就是建立多个工厂，每个工厂负责生产一种产品。

## 6、抽象工厂模式

>抽象工厂模式是对工厂模式的补充，工厂模式下需要创建很多工厂，假如说一些产品是有共性的，比如说属于同一个品牌，那么其实可以只用一个工厂生产同一个品牌的多种产品，叫做产品族，减少了工厂的数量。
>
>三种变体的区别：
>
>简单工厂：一个工厂生产多种产品。
>
>工厂：建立多个工厂，一个工厂负责一种产品。
>
>抽象工厂：建立多个工厂，一个工厂负责生产多个产品。

## 7、观察者模式

> 当涉及到多个对象都对一个特殊对象中的数据变化进行跟踪，也就是对象间存在一对多的关系时，可以使用观察者模式，当特殊对象的数据更新时，追踪它的其他多个对象将得到通知。这种设计模式符合开闭原则，可以降低对象之间的耦合，同时达到一个对象改变通知其他对象的目的。使用场景比如订阅系统。

## 8、装饰器模式

## 9、模板方法模式

## 10、代理模式

## 11、策略模式

## 12、适配器模式