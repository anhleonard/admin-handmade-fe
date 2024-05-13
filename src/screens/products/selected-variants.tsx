import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import MySelect, { Item } from "@/libs/select";
import { Grid } from "@mui/material";

type Props = {
  data: any;
  selectedItems: any;
  setSelectedItems: any;
};

const SelectedVariants = ({ data, selectedItems, setSelectedItems }: Props) => {
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  // const [selectedItems, setSelectedItems] = useState({});

  const handleVariantChange = (event: any) => {
    const variantName = event.target.name;
    if (event.target.checked) {
      setSelectedVariants([...selectedVariants, variantName]);
    } else {
      setSelectedVariants(
        selectedVariants.filter((variant: any) => variant !== variantName),
      );
    }
  };

  const handleItemChange = (item: Item, variantName: string) => {
    setSelectedItems((prevState: any) => ({
      ...prevState,
      [variantName]: item,
    }));
  };

  useEffect(() => {
    const updatedSelectedItems: { [key: string]: Item } = { ...selectedItems };
    for (const key in selectedItems) {
      if (!selectedVariants.includes(key)) {
        delete updatedSelectedItems[key];
      }
    }
    setSelectedItems(updatedSelectedItems);
  }, [selectedVariants]);

  return (
    <div>
      <FormControl component="div" className="w-full">
        <FormGroup>
          <Grid
            container
            rowSpacing={10}
            columnSpacing={{ xs: 1, sm: 2, md: 4 }}
          >
            {data?.map((variant: any) => (
              <Grid item xs={6}>
                <div key={variant.id} className="w-full">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedVariants.includes(variant.variantName)}
                        onChange={handleVariantChange}
                        name={variant.variantName}
                      />
                    }
                    label={variant.variantName}
                  />
                  {selectedVariants.includes(variant.variantName) && (
                    <MySelect
                      id=""
                      name=""
                      placeholder="-- Lựa chọn --"
                      options={variant?.variantItems}
                      wrapClassName="!w-full"
                      onSelectItem={(item: Item) => {
                        handleItemChange(item, variant?.variantName);
                      }}
                    />
                  )}
                </div>
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default SelectedVariants;
