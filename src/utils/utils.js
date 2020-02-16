
export function customSort(array, sortby, dec = false, codes) {
    let v1 = -1;
    let v2 = 1;
    if (dec) {
      v1 = 1;
      v2 = -1;
    }
    array.sort((a, b) => {
      if (codes) {
        if (codes[a[sortby]] < codes[b[sortby]]) {
          return v1;
        } else if (codes[a[sortby]] > codes[b[sortby]]) {
          return v2;
        }
        return 0;
      } else {
        return (a[sortby] < b[sortby] ? v1 : a[sortby] > b[sortby] ? v2 : 0);
      }
    });
    return array;
}

export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }