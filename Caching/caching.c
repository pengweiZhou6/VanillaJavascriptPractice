#include <stdio.h>
#include <stdlib.h>

/* book structure definition */
struct book
{
    char *title;
    char *author;
    char *language;
};
typedef struct book book;

/* node structure definition */
struct node
{
    char *title;
    char *author;
    char *language;
    struct node *next;
};

typedef struct node node;

struct queue
{
    int size;
    int count;
    node *front;
    node *rear;
};

typedef struct queue queue;

void initialize(queue *q, int n)
{
    q->size = n;
    q->count = 0;
    q->front = NULL;
    q->rear = NULL;
}

void addBook(book *b, char *title, char *author, char *language)
{
    b->title = title;
    b->author = author;
    b->language = language;
}

/* prototype */
void enqueue(queue *q, book *b);
void dequeue(queue *q);
void display(node *head);
int isempty(queue *q);
int isfull(queue *q);

void enqueue(queue *q, book *b)
{
    if (!isfull(q))
    {
        node *tmp;
        tmp = malloc(sizeof(node));
        tmp->title = b->title;
        tmp->author = b->author;
        tmp->language = b->language;
        tmp->next = NULL;
        if (!isempty(q))
        {
            q->rear->next = tmp;
            q->rear = tmp;
        }
        else
        {
            q->front = q->rear = tmp;
        }
        q->count++;
    }
    else
    {
        dequeue(q);
        enqueue(q, b);
    }
}

void dequeue(queue *q)
{
    if (q->count != 0)
    {
        node *tmp;
        tmp = q->front;
        q->front = q->front->next;
        q->count--;
        free(tmp);
    }
    else
    {
        printf("It is empty\n");
    }
}

void display(node *head)
{
    if (head == NULL)
    {
        printf("NULL\n\n");
    }
    else
    {
        printf("%s\n", head->title);
        display(head->next);
    }
}

int isempty(queue *q)
{
    return (q->rear == NULL);
}

int isfull(queue *q)
{
    return q->count + 1 > q->size;
}

int main()
{
    int max = 3;
    queue *q;
    q = malloc(sizeof(queue));
    initialize(q, max);

    book *book1;
    book1 = malloc(sizeof(book));
    addBook(book1, "book1", "book1", "book1");

    book *book2;
    book2 = malloc(sizeof(book));
    addBook(book2, "book2", "book2", "book2");

    book *book3;
    book3 = malloc(sizeof(book));
    addBook(book3, "book3", "book3", "book3");

    book *book4;
    book4 = malloc(sizeof(book));
    addBook(book4, "book4", "book4", "book4");

    book *book5;
    book5 = malloc(sizeof(book));
    addBook(book5, "book5", "book5", "book5");

    printf("Queue before dequeue\n");
    display(q->front);

    enqueue(q, book1);
    display(q->front);
    enqueue(q, book2);
    display(q->front);
    enqueue(q, book3);
    display(q->front);
    enqueue(q, book4);
    display(q->front);
    enqueue(q, book5);
    display(q->front);

    printf("Queue after dequeue\n");
    dequeue(q);
    display(q->front);
    dequeue(q);
    display(q->front);
    dequeue(q);
    display(q->front);
    dequeue(q);
    display(q->front);
    dequeue(q);
    display(q->front);

    return 0;
}