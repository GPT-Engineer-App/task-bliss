import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTask = { id: Date.now(), text: input, isCompleted: false };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={5}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <Button onClick={handleAddTask} ml={2} colorScheme="blue">Add Task</Button>
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" alignItems="center">
            <ListIcon
              as={task.isCompleted ? FaCheckCircle : FaRegCircle}
              color={task.isCompleted ? 'green.500' : 'gray.500'}
              cursor="pointer"
              onClick={() => handleToggleTask(task.id)}
            />
            <Box flex="1" as="span" ml={2} textDecoration={task.isCompleted ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <IconButton
              icon={<FaTrash />}
              colorScheme="red"
              onClick={() => handleDeleteTask(task.id)}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;