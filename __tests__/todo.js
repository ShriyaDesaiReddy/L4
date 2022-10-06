const todo=require("../todo");
const today=new Date().toLocaleDateString("en-CA");
const {all,add,markAsComplete,overdue,dueToday,dueLater} = todo();
var d=new Date();
var yesterday=new Date(d);
yesterday.setDate(d.getDate()+1);
var tommorow=new Date(d);
tommorow.setDate(d.getDate()+1);
 
describe("TODO test", ()=>{
  beforeAll(()=>{
    add({
      title: "Web development",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });
  });
  test("Add task",()=>{
    let len=all.length;
    add({
      title: "NODE",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(all.length).toBe(len+1);
  });
  test("Mark task as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Over due",()=>{  
    let l = overdue();

    expect(
      l.every((t) => {
        return t.dueDate < today;
      })
    ).toBe(true);
  });
  test("Due today",()=>{
    let l=dueToday();
    expect(
      l.every((t)=>{
        return t.dueDate === today;
      })
    ).toBe(true);
  });
  test("Due later",()=>{
    let len=dueLater().length;
    add({
      title: "VS",
      dueDate: tommorow.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(dueLater().length).toBe(len+ 1);
  });
});