export const getNewIndex = (elements) =>{
    let list = elements.map(el => +el.id);
    let newIndex = 0;
    while (list.indexOf(newIndex) > -1) newIndex += 1;
    return newIndex.toString();
  }