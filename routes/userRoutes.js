
const express = require('express');
const fs = require('fs');
const path = require('path');
const Employee = require('../models/employee.model');
const Admin = require('../models/admin.model');
const upload = require('../middleware/upload');


const router = express.Router();

router.get('/api/admin/get', async (req, res) => {

  try {
    const data = await Admin.find();
    res.json(data);
  }
  catch (error) {
    res.status(400).json({ message: 'Error getting admin details', error });
  }
})

router.get('/api/employees/get', async (req, res) => {

  try {
    console.log("in the get request");
    const data = await Employee.find();
    console.log('data : ', data);
    res.json(data);
  }
  catch (error) {
    res.status(400).json({ message: 'Error getting Employee list', error });
  }

})

router.get('/api/employees/get/:id', async (req, res) => {

  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  }
  catch (error) {
    res.status(400).json({ message: 'Error getting the Employee', error });
  }

})

router.post('/api/employees/create', upload.single('image'), (req, res) => {
  try {

    const { name, email, mobile, designation, gender, course } = req.body;

    console.log(req.body);

    const imagePath = `${req.file.filename}`;

    const newEmployee = new Employee({ name, email, mobile, designation, gender, course, image: imagePath });

    console.log(newEmployee);

    newEmployee.save();

    res.status(201).json({ message: 'Employee created successfully', newEmployee });

  } catch (error) {

    res.status(400).json({ message: 'Error creating employeee', error });

  }
});

router.put('/api/employees/update/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params
    console.log(id);
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (req.file) {
      if (employee.image) {
        console.log(__dirname);
        fs.unlinkSync(path.join('uploads/', employee.image));
      }
      employee.image = `${req.file.filename}`;
      console.log(employee.image)
    }

    await employee.save();
    res.json({ message: 'Employee updated successfully', employee });

  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
})

router.delete('/api/employees/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (employee.image) {
      const imagePath = path.join('uploads', employee.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); 
      }
    }

    // Delete the employee record
    await Employee.findByIdAndDelete(id);

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee' });
  }
})

module.exports = router;
