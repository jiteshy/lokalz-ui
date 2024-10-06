"use client";

import useSWR from "swr";
import { Store, StoreType } from "@repo/ui/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ADMIN_APIS, US_STATES } from "@repo/ui/config";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/app/loading";
import { storeFormSchema } from "./store-form-schema";
import { useEffect } from "react";
import { useAxios } from "@/hooks/use-axios";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckIcon, EraserIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";

const createFormData = (store?: Store): z.infer<typeof storeFormSchema> =>
  store
    ? {
        name: store.name,
        description: store.description,
        email: store.email,
        phone: store.phone,
        address: {
          street: store.address?.street,
          city: store.address?.city,
          state: store.address?.state,
          zipCode: store.address?.zipCode?.toString(),
        },
        tags: store.tags?.join(","),
        type: store.type,
      }
    : {
        name: "",
        description: "",
        email: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
        tags: "",
        type: "FOOD_TRUCK",
      };

const createStoreData = (formData: z.infer<typeof storeFormSchema>): Store => ({
  name: formData.name,
  description: formData.description,
  email: formData.email,
  phone: formData.phone,
  address: {
    street: formData.address.street,
    city: formData.address.city,
    state: formData.address.state,
    zipCode: Number(formData.address?.zipCode),
  },
  tags: formData.tags.split(","),
  type: formData.type as StoreType,
  imageUrl: "",
});

export const StoreForm = ({ storeId }: { storeId: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const axios = useAxios();

  const storeForm = useForm<z.infer<typeof storeFormSchema>>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: createFormData(),
  });

  const { data: storeData, isLoading: isStoreDataLoading } = useSWR<Store>(
    storeId ? `${ADMIN_APIS.STORE.STORE_DETAILS}/${storeId}` : null,
  );

  useEffect(() => {
    if (storeData) {
      const formData = createFormData(storeData);
      storeForm.reset(formData);
    }
  }, [storeData]);

  useEffect(() => {
    // Set submitted values as the base for reset after form submit
    if (storeForm.formState.isSubmitSuccessful) {
      storeForm.reset(storeForm.getValues());
    }
  }, [storeForm.formState, storeForm.reset]);

  const onSubmitSuccess = (response: AxiosResponse) => {
    toast({
      title: "Success!",
      duration: 5000,
      description: `Store ${storeId ? "updated" : "created"} successfully.`,
    });
    // Redirect if new store was created
    if (!storeId) {
      const newStoreId = response.data?.objectId;
      if (newStoreId) {
        router.push(`/store/${newStoreId}?tab=menu`);
      } else {
        router.push("/store/list");
      }
    }
  };

  const onSubmitError = () => {
    toast({
      variant: "destructive",
      duration: 5000,
      title: "Failure!",
      description: `Store ${storeId ? "update" : "creation"} failed.`,
    });
  };

  const onSubmit = (values: z.infer<typeof storeFormSchema>) => {
    const storeData = createStoreData(values);
    const axiosAction = storeId
      ? axios.put(`/store/${storeId}`, storeData)
      : axios.post("/store", storeData);

    axiosAction.then(onSubmitSuccess, onSubmitError);
  };

  return (
    <div>
      {isStoreDataLoading || storeForm.formState.isSubmitting ? (
        <Loading />
      ) : (
        <div className="sm:max-w-screen-lg m-auto pt-3">
          <Form {...storeForm}>
            <form
              key={storeId && storeForm.watch("email")}
              onSubmit={storeForm.handleSubmit(onSubmit)}
              className="space-y-3"
            >
              <div className="flex items-center justify-between pb-2 mb-8 border-b border-b-slate-200 dark:border-strokedark">
                <h4 className="text-xl">
                  Store Details
                  <span className="text-xs text-slate-500 dark:text-slate-400 pl-2">
                    (Add/Update store details below)
                  </span>
                </h4>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => storeForm.reset()}
                    className="shadow"
                  >
                    <EraserIcon className="w-5 h-5" />
                    <span className="pl-2">Reset</span>
                  </Button>
                  <Button
                    type="submit"
                    disabled={storeForm.formState.isSubmitting}
                  >
                    <CheckIcon className="w-5 h-5" />
                    <span className="pl-2">Save Store</span>
                  </Button>
                </div>
              </div>
              <FormField
                control={storeForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter store name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter contact email"
                        {...field}
                        disabled={!!storeId}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Type*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!!storeId}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a store type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(StoreType).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Tags*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter store tags" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter comma separated tags
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State*</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(US_STATES).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="address.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zipcode*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter zipcode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={storeForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter store description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Max 1000 chars</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-3 pt-6">
                <Button
                  variant="outline"
                  onClick={() => storeForm.reset()}
                  className="shadow"
                >
                  <EraserIcon className="w-5 h-5" />
                  <span className="pl-2">Reset</span>
                </Button>
                <Button
                  type="submit"
                  disabled={storeForm.formState.isSubmitting}
                >
                  <CheckIcon className="w-5 h-5" />
                  <span className="pl-2">Save Store</span>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};
