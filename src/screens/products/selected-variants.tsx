import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import MySelect, { Item } from "@/libs/select";
import { Grid } from "@mui/material";
import {
  ItemVariantCategory,
  SelectedItem,
  VariantCategory,
} from "@/enum/defined-type";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {
  data: ItemVariantCategory[];
  selectedItems: SelectedItem;
  chosenVariants?: string[];
  setSelectedItems: any;
};

const SelectedVariants = ({
  data,
  selectedItems,
  setSelectedItems,
  chosenVariants,
}: Props) => {
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);
  const [selectedVariants, setSelectedVariants] = useState<string[]>(
    chosenVariants ?? [],
  );

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
            {data?.map((cate: ItemVariantCategory, index: number) => {
              const variantName = cate?.variantName;
              return (
                <Grid item xs={6} key={index}>
                  <div key={cate.id} className="w-full">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedVariants.includes(variantName)}
                          onChange={handleVariantChange}
                          name={variantName}
                        />
                      }
                      label={variantName}
                    />
                    {selectedVariants.includes(variantName) && (
                      <MySelect
                        id=""
                        name=""
                        placeholder="-- Lựa chọn --"
                        options={cate?.variantItems}
                        wrapClassName="!w-full"
                        onSelectItem={(item: Item) => {
                          handleItemChange(item, cate?.variantName);
                        }}
                        selected={
                          selectedVariants.includes(variantName)
                            ? selectedItems[variantName]?.value
                            : null
                        }
                      />
                    )}
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </FormGroup>
      </FormControl>
    </div>
  );
};

export default SelectedVariants;
