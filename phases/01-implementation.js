class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    this.capacity = numBuckets
    this.data = new Array(numBuckets).fill(null)
    this.count = 0
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    const newPair = new KeyValuePair(key, value)
    const index = this.hashMod(key)

    let curr = this.data[index]
    while (curr) {
      if (curr.key === key) {
        curr.value = value
        return
      }
      curr = curr.next
    }
    if (!this.data[index]) {
      this.data[index] = newPair
    } else {
      newPair.next = this.data[index]
      this.data[index] = newPair
    }
    this.count++
  }


  read(key) {
    const index = this.hashMod(key);
    let curr = this.data[index];
    while (curr) {
      if (curr.key === key) {
        return curr.value;
      }
      curr = curr.next;
    }
    return undefined;
  }


  resize() {
    const data = this.data;
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null)
    this.count = 0
    for (let i = 0; i < data.length; i++) {
      let curr = data[i]
      while (curr) {
        this.insert(curr.key, curr.value)
        curr = curr.next
      }
    }
  }


  delete(key) {
    const index = this.hashMod(key);
    let curr = this.data[index];
    while (curr) {
      if (curr.key === key) {
        this.curr = null
      }
      curr = curr.next;
    }
    return "Key not found";
  }
}


module.exports = HashTable;
