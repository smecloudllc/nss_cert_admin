import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import {
  usePhoneInput,
  CountryIso2,
  parseCountry,
  FlagImage,
  defaultCountries,
} from "react-international-phone";
import "react-international-phone/style.css";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface PhoneInputProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  value?: string;
  onChange?: (phone: string) => void;
  defaultCountry?: CountryIso2;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, defaultCountry = "us", ...props }, ref) => {
    const { inputValue, phone, country, setCountry, handlePhoneValueChange } =
      usePhoneInput({
        defaultCountry,
        value,
        countries: defaultCountries,
        onChange: (data) => {
          onChange?.(data.phone);
        },
      });

    return (
      <div className={cn("flex", className)}>
        <CountrySelect
          value={country.iso2}
          options={defaultCountries.map((c) => ({
            value: c[1] as CountryIso2,
            label: c[0],
          }))}
          onChange={(countryIso2) => {
            // Find the full country data array first
            const countryData = defaultCountries.find(
              (c) => c[1] === countryIso2
            );
            if (countryData) {
              // Pass the country data array to parseCountry
              const newCountry = parseCountry(countryData);
              if (newCountry) {
                setCountry(countryIso2);
              }
            }
          }}
          disabled={props.disabled}
        />
        <Input
          ref={ref}
          className={cn("rounded-e-lg rounded-s-none py-6", className)}
          type="tel"
          value={inputValue}
          onChange={handlePhoneValueChange}
          placeholder={`+${country.dialCode}`}
          {...props}
        />
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput";

type CountryEntry = { label: string; value: CountryIso2 };

type CountrySelectProps = {
  disabled?: boolean;
  value: CountryIso2;
  options: CountryEntry[];
  onChange: (country: CountryIso2) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedCountryData = React.useMemo(() => {
    return defaultCountries.find((c) => c[1] === selectedCountry);
  }, [selectedCountry]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 py-6 px-3 focus:z-10"
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} />
          <ChevronsUpDown
            className={cn(
              "-mr-2 size-4 opacity-50",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]"
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) => {
                  const countryData = defaultCountries.find(
                    (c) => c[1] === value
                  );
                  if (!countryData) return null;

                  return (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      dialCode={countryData[2]}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps {
  country: CountryIso2;
  countryName: string;
  dialCode: string;
  selectedCountry: CountryIso2;
  onChange: (country: CountryIso2) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  dialCode,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem className="gap-2" onSelect={handleSelect}>
      <FlagComponent country={country} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${dialCode}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${
          country === selectedCountry ? "opacity-100" : "opacity-0"
        }`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country }: { country: CountryIso2 }) => {
  return (
    <div className="flex h-6 w-6 overflow-hidden rounded-sm ">
      <FlagImage iso2={country} className="w-full h-full object-cover" />
    </div>
  );
};

export { PhoneInput };
