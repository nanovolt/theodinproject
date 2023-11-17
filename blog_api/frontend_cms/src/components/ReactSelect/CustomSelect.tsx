import classNames from "classnames";
import styles from "./CustomSelect.module.css";
import Select, { GroupBase, OptionProps, Props } from "react-select";

// type Option = {
//   label: string;
//   value: string;
// };

// type SelectProps = {
//   options: Option[];
// };

// export const CustomSelect = ({ options, ...rest }: SelectProps) => {
//   return (
//     <Select
//       options={options}
//       styles={{
//         control: (baseStyles, state) => ({
//           ...baseStyles,
//           borderColor: state.isFocused ? "none" : "",
//         }),
//       }}
//       theme={(theme) => ({
//         ...theme,
//         borderRadius: 0,
//         colors: {
//           ...theme.colors,
//         },
//       })}
//       className={styles.selectList}
//       {...rest}
//     />
//   );
// };

const Option = (props: OptionProps<any>) => {
  const {
    children,
    className,
    cx,
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    innerProps,
  } = props;
  return (
    <div
      ref={innerRef}
      css={getStyles("option", props)}
      className={cx(
        {
          option: true,
          "option--is-disabled": isDisabled,
          "option--is-focused": isFocused,
          "option--is-selected": isSelected,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

export function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <Select
      {...props}
      unstyled={true}
      // components={{ Option }}
      // styles={{
      //   container: (base) => ({
      //     ...base,
      //     // backgroundColor: ,
      //     padding: 8,
      //   }),
      //   control: (baseStyles, state) => ({
      //     ...baseStyles,
      //     borderColor: state.isFocused ? "none" : "",
      //   }),
      // }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary: "dodgerblue",
        },
      })}
      classNamePrefix="react-select"
      className={classNames(styles.selectList, styles.menu)}
    />
  );
}
