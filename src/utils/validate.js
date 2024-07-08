export const checkValidate = (name, email, password, isSignInForm) => {
  const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name)
  const isEmailValid = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

  if (!isSignInForm && (!name || !isNameValid)) return "Enter a valid Name"
  if (!isEmailValid) return "Enter a valid Email"
  if (!isPasswordValid) return "Enter a valid Password"

  return null
}