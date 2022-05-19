# Seb's Pickwatch Assignment

## Running the project
First, run `yarn` to install the required packages followed by `yarn dev` to start the project.  
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing
Testing was implemented on this project using enzyme and jest.  
Issues that occurred were the initial configuration and setup of jest. This was overcome by reading the documentation and other tutorials/guides that others had shared online.  
Functional unit tests have been implemented to make sure that the components are behaving as intended.  
Thorough user testing has also been done to make sure that all components are working on the page as expected.

## Frontend
Here, the user can enter their name, email and a message to be submitted.
All values are validated before allowing the submission button to be enabled.  
After submission, the form is cleared and the information is presented as a card below the form.  
If the form is submitted again, this information is saved as a new card on top of the previous card(s).  
Closing any cards deletes them from localstorage, but keeps them saved in the database.

## API
Upon clicking submit, the data is posted to an API stored in `pages/api/pickwatch`.  
This API checks that the required values are present as a second layer of security in case the user decides to access the API directly.  
A backend function is then called posting the data to the database.  
The database can be accessed in various ways, but here I have chosen to access it via an API call.  
This wrapper around the API prevents the user from seeing any unnecessary information and keeps their error messages more generic.

## Database
I have set up a database in [restdb.io](restdb.io) that saves the information submitted to it.  
Restrictions can be added to this database so that only calls from whitelisted domains can make certain queries.
