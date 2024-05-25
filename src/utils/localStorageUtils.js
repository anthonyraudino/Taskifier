export const loadLists = () => {
    const lists = localStorage.getItem('todoLists');
    return lists ? JSON.parse(lists) : [];
  };
  
  export const saveLists = (lists) => {
    localStorage.setItem('todoLists', JSON.stringify(lists));
  };
  