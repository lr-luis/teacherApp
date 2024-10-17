export const register = async (req, res) => {
  console.log(req.body)
  return res.status(500).json({
    message: 'this is a test message',
  })
}