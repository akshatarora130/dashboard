  import { useState } from 'react';
  import './App.css';
  import Navbar from "./Components/Navbar";
  import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

  function App() {
      const [tasks, setTasks] = useState({
          pending: [],
          completed: [],
          inProgress: []
      });
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', status: 'pending' });

      const openDialog = () => {
          setIsDialogOpen(true);
      };

      const closeDialog = () => {
          setIsDialogOpen(false);
          setNewTask({ title: '', description: '', dueDate: '', status: 'pending' });
      };

      const handleChange = (e) => {
          const { name, value } = e.target;
          setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
      };

      const handleSubmit = (e) => {
          e.preventDefault();
          setTasks((prevTasks) => {
              return { 
                  ...prevTasks, 
                  [newTask.status]: [...prevTasks[newTask.status], newTask] 
              };
          });
          closeDialog();
      };

      const handleDelete = (status, index) => {
          setTasks((prevTasks) => {
              const updatedTasks = prevTasks[status].filter((_, i) => i !== index);
              return { ...prevTasks, [status]: updatedTasks };
          });
      };

      const onDragEnd = (result) => {
          const { source, destination } = result;

          if (!destination) return;
          if (source.droppableId === destination.droppableId && source.index === destination.index) return;

          const sourceList = tasks[source.droppableId];
          const destinationList = tasks[destination.droppableId];
          const movedTask = sourceList[source.index];

          sourceList.splice(source.index, 1);
          destinationList.splice(destination.index, 0, movedTask);

          setTasks({ 
              ...tasks, 
              [source.droppableId]: [...sourceList], 
              [destination.droppableId]: [...destinationList] 
          });
      };

      return (
          <>
              <div className="w-screen h-screen bg-gray-900 text-white flex flex-col">
                  <Navbar />
                  <div className="flex justify-center mt-10">
                      <button onClick={openDialog} className="bg-blue-500 p-2 rounded">
                          Add Task
                      </button>
                  </div>

                  <DragDropContext onDragEnd={onDragEnd}>
                      <div className="flex justify-around mt-10 gap-8">
                          {Object.keys(tasks).map((status) => (
                              <Droppable key={status} droppableId={status}>
                                  {(provided) => (
                                      <div className="w-1/3 bg-gray-800 p-4 rounded" {...provided.droppableProps} ref={provided.innerRef}>
                                          <h2 className="text-center text-xl mb-4">{status}</h2>
                                          {tasks[status].map((task, index) => (
                                              <Draggable key={task.title} draggableId={task.title} index={index}>
                                                  {(provided) => (
                                                      <div
                                                          ref={provided.innerRef}
                                                          {...provided.draggableProps}
                                                          {...provided.dragHandleProps}
                                                          className="bg-gray-700 p-2 mb-2 rounded"
                                                      >
                                                          <h3 className="font-bold">{task.title}</h3>
                                                          <p>{task.description}</p>
                                                          <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
                                                          <button
                                                              onClick={() => handleDelete(status, index)}
                                                              className="bg-red-500 text-white p-1 mt-2 rounded"
                                                          >
                                                              Delete Task
                                                          </button>
                                                      </div>
                                                  )}
                                              </Draggable>
                                          ))}
                                          {provided.placeholder}
                                      </div>
                                  )}
                              </Droppable>
                          ))}
                      </div>
                  </DragDropContext>

                  {isDialogOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                          <div className="bg-white text-black p-6 rounded w-1/3">
                              <h2 className="text-center text-xl mb-4">Add New Task</h2>
                              <form onSubmit={handleSubmit}>
                                  <div className="mb-4">
                                      <label className="block text-sm font-bold mb-2">Title</label>
                                      <input
                                          type="text"
                                          name="title"
                                          value={newTask.title}
                                          onChange={handleChange}
                                          className="w-full p-2 border rounded"
                                          required
                                      />
                                  </div>
                                  <div className="mb-4">
                                      <label className="block text-sm font-bold mb-2">Description</label>
                                      <textarea
                                          name="description"
                                          value={newTask.description}
                                          onChange={handleChange}
                                          className="w-full p-2 border rounded"
                                          required
                                      ></textarea>
                                  </div>
                                  <div className="mb-4">
                                      <label className="block text-sm font-bold mb-2">Due Date</label>
                                      <input
                                          type="date"
                                          name="dueDate"
                                          value={newTask.dueDate}
                                          onChange={handleChange}
                                          className="w-full p-2 border rounded"
                                          required
                                      />
                                  </div>
                                  <div className="mb-4">
                                      <label className="block text-sm font-bold mb-2">Status</label>
                                      <select
                                          name="status"
                                          value={newTask.status}
                                          onChange={handleChange}
                                          className="w-full p-2 border rounded"
                                      >
                                          <option value="pending">Pending</option>
                                          <option value="inProgress">In Progress</option>
                                          <option value="completed">Completed</option>
                                      </select>
                                  </div>
                                  <div className="flex justify-between">
                                      <button type="button" onClick={closeDialog} className="bg-red-500 text-white p-2 rounded">
                                          Cancel
                                      </button>
                                      <button type="submit" className="bg-green-500 text-white p-2 rounded">
                                          Add Task
                                      </button>
                                  </div>
                              </form>
                          </div>
                      </div>
                  )}
              </div>
          </>
      );
  }

  export default App;
