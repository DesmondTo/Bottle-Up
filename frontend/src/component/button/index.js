import { Button } from '@rneui/themed';

function CustomButton(props) {
  return (
    <Button
      buttonStyle={{
        backgroundColor: props.color ? props.color : 'rgba(39, 39, 39, 1)',
      }}
      {...props}
    />
  );
}

export default CustomButton;
