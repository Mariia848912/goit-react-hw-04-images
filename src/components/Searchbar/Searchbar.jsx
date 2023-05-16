import {
  SearchbarBox,
  SearchForm,
  Button,
  Input,
  Icon,
} from './Searchbar.styled';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { NOTIFICATION } from "../../constants/notification";

const initialValues = {
  searchQuery: '',
};

export const Searchbar = ({onSubmit}) => {
  const handleSumbit = (value, actions) => {
    if (value.searchQuery.trim() === '') {
       toast.error(NOTIFICATION.noInfoToSearch);
      return;
    }
    onSubmit(value.searchQuery);
    actions.resetForm();
  };

  return (
    <SearchbarBox>
      <Formik initialValues={initialValues} onSubmit={handleSumbit}>
        <SearchForm>
          <Button type="submit">
            <Icon />
          </Button>

          <Input
            type="text"
            autoComplete="off"
            name="searchQuery"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchbarBox>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
