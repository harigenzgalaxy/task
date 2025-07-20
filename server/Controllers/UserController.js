const getSomedata = (req, res) => {
  const Data = {
    name: "Sam's Studio",
    location: "Ahmedabad",
    active: true,
  };

  res.json({ success: true, data: Data });
};

const getdatabyid = (req, res) => {
  const id = req.params.id;
  res.json({ id, name: `Studio ${id}` });
};

module.exports = {
  getSomedata,
  getdatabyid,
};
