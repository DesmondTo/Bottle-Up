import { Button } from '@rneui/themed';

function CustomButton(props) {
  return (
    <Button
      buttonStyle={{
        backgroundColor: props.color ? props.color : '#002233',
      }}
      {...props}
    />
  );
}

export default CustomButton;
