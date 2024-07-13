class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insert(value) {
    const newNode = new Node(value, this.head);
    this.head = newNode;
    this.size++;
  }

  insertAtEnd(value) {
    let current = this.head;
    if (!current) {
      this.insert(value);
      return;
    }

    while (current.next) {
      current = current.next;
    }

    current.next = new Node(value);
    this.size++;
  }

  sizeof() {
    return this.size;
  }

  at(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  join(separator = ",") {
    if (!this.head) {
      return "";
    }

    let values = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }

    return values.join(separator);
  }

  map(callback) {
    const newList = new LinkedList();
    let current = this.head;

    while (current) {
      const newValue = callback(current.value);
      newList.insertAtEnd(newValue);
      current = current.next;
    }

    return newList;
  }

  filter(callback) {
    const newList = new LinkedList();
    let current = this.head;

    while (current) {
      if (callback(current.value)) {
        newList.insertAtEnd(current.value);
      }
      current = current.next;
    }

    return newList;
  }

  find(callback) {
    let current = this.head;
    while (current) {
      if (callback(current.value)) {
        return current;
      }
      current = current.next;
    }

    return null;
  }
}

const list = new LinkedList();
console.log(list);
list.insert("a");
console.log(list);
list.insert("b");
console.log(list);
list.insert("c");
console.log(list);
list.insertAtEnd("d");
console.log(list);

console.log(list.sizeof());
console.log(list.at(1).value);
console.log(list.join(" - "));
console.log(list.map((value) => value.toUpperCase()).join(" "));
console.log(list.filter((value) => value.length === 1).join(""));
console.log(list.find((value) => value === "b"));
