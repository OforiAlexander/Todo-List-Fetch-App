import Todo from '../models/Todo.js';

async function seedDatabase() {
    try {
        const todos = [
            { title: 'Learn Express.js', completed: false },
            { title: 'Build a REST API', completed: false },
            { title: 'Integrate PostgreSQL', completed: false },
            { title: 'Implement validation', completed: true },
            { title: 'Set up Sequelize', completed: true },
            { title: 'Create user authentication', completed: false },
            { title: 'Add user roles and permissions', completed: false },
            { title: 'Design frontend layout', completed: true },
            { title: 'Implement CORS in API', completed: true },
            { title: 'Add error handling middleware', completed: false },
            { title: 'Test API with Postman', completed: true },
            { title: 'Deploy app to Heroku', completed: false },
            { title: 'Set up logging and monitoring', completed: false },
            { title: 'Optimize database queries', completed: false },
            { title: 'Document API endpoints', completed: true },
        ];        

        for (const todo of todos) {
           const [record, created] = await Todo.findOrCreate({
                where: { title: todo.title },
                defaults: { completed: todo.completed },
            });
            if (created) {
                console.log('Todos seeded successfully');
            }
            else {
                console.log("Skipped the seeding process since there can't be duplicate titles")
            }
        }

    } catch (error) {
        console.error('Error seeding todos:', error);
    }
};
seedDatabase();