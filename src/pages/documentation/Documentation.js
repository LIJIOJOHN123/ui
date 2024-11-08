import React from "react";
import { Card, Col, Row } from "react-bootstrap";

function Documentation() {
  const data = {
    website_reachability_check: {
      data: { page_accessibilty: true },
      dynamic_website: true,
      method: "mv",
      redirect_url: " ",
      status: "200",
      website_redirection: false,
      website_response_code: 200,
      website_url: "https://duraup.in",
      website_working_status: true,
    },
    websiteCategorizationV1: {
      categories: [
        {
          "Category type": "",
          IAB22: "Ayurvedic Medicine",
          confidence: 1,
          input_mcc_match: false,
          is_refurbished: false,
          mcc_code: 8099,
          name: "Healthy Living/Wellness/Ayurvedic Medicine",
          risk_classification: "Approved - High",
          risk_level: "High",
          status: "Approved - High",
        },
      ],
      domain: {
        Possible_Categories: {
          "Healthy Living/Nutrition/Nutrition": {
            confidence: 0.6692850924284856,
            mcc_code: 5499,
          },
          "Healthy Living/Wellness/Ayurvedic Medicine": {
            confidence: 100,
            mcc_code: 8099,
          },
        },
        audit: {
          createdDate: "Thu, 16 May 2024 05:49:12 GMT",
          domainName: "duraup.in",
          estimatedDomainAge: 84,
          expiresDate: "Fri, 16 May 2025 05:49:12 GMT",
          registrarName: "GoDaddy.com, LLC",
        },
      },
    },
    Transaction_Laundering_name_matched_uls: [],
    is_blacklisted: false,
    legal_name_match: false,
    paidup_capital: "₹34,200,000",
    dns_records: [
      {
        dnsType: "CNAME",
        name: "www.duraup.in",
      },
      {
        dnsType: "A",
        location: {
          ip: "89.117.27.127",
          ip_location_data: {
            city_name: "Mumbai",
            country_code: "IN",
            country_name: "India",
            isp: "SC Lithuanian Radio and TV Center",
            region: "Maharashtra",
          },
        },
      },
    ],
    blacklist_checks: [
      {
        blacklist_email_check: { status: "not blacklisted" },
      },
      {
        blacklist_phone_check: { status: "not blacklisted" },
      },
      {
        blacklist_upi_check: { status: "Not Blacklisted" },
      },
    ],
    sslCheckInfo: {
      ssl_check: {
        message: "SSL Certificate is  Valid.",
        status: 200,
      },
      dns_valid: true,
      domain: "duraup.in",
      domain_age: { human: "3 months ago" },
      domain_rank: 0,
      domain_trust: "neutral",
      language_code: "EN",
      malware: false,
      mx_records: ["mx1.hostinger.com", "mx2.hostinger.com"],
      ns_records: ["ns1.dns-parking.com", "ns2.dns-parking.com"],
      page_size: 143662,
      page_title:
        "Duraup Capsules | Supreme Quality Ayurveda Wellness Medicines...",
      parking: false,
      phishing: false,
      redirected: true,
      server: "LiteSpeed",
      spamming: false,
      suspicious: false,
      technologies: [
        "Google Analytics",
        "Google Fonts",
        "Facebook Pixel",
        "WordPress",
      ],
      unsafe: false,
    },
    policy_complaince_checks: {
      contact: {
        capture_status: "true",
        contact_check_details: {
          address_check: {},
          email_check: {
            email_match_config: [],
            emailid_already_present: "false",
          },
          legal_name_check: {},
          phone_check: {
            contact_already_present: "false",
            phone_match_config: [],
          },
        },
        contact_url: ["https://duraup.in/contact/"],
        contacts_form: { status: "True" },
        contains_valid_email: "true",
        contains_valid_phone: "true",
        emails: ["Info@duraup.in", "info@duraup.in"],
        phone_number: ["+918360071416"],
      },
      policy_screenshot: ["screenshot.png"],
      status: "accessible",
    },
    product_pricing_checks: {
      currencies: ["₹"],
      currencies_found: true,
      max_price: 395,
      min_price: 395,
      price_average: {
        average_product_price: 395,
        product_page_links: ["https://duraup.in/"],
      },
      price_listing: true,
      prices: [395],
      un_reasonable_price: false,
    },
    social_media_link_check: {
      social_media_links: [
        "https://www.facebook.com/duraup.in",
        "https://twitter.com/duraup_in",
        "https://www.instagram.com/duraup.in/",
      ],
      social_media_urls_insights: {},
      status: "true",
    },
  };

  const formatJson = (json) => {
    const formattedJson = JSON.stringify(json, null, 2);
    return formattedJson.split("\n").map((line, index) => {
      const keyMatch = line.match(/"([^"]+)":/);
      const valueMatch = line.match(/: ("[^"]+"|[^,}]+)/);

      const key = keyMatch ? keyMatch[1] : null;
      const value = valueMatch ? valueMatch[1] : null;

      return (
        <div key={index}>
          {key && <span style={{ color: "#d32f2f" }}>"{key}"</span>}
          {key && <span>: </span>}
          {value && <span style={{ color: "#388e3c" }}>{value}</span>}
          {!(key || value) && <span>{line}</span>}
        </div>
      );
    });
  };

  return (
    <div className="m-0">
      <h4 className="text-center">API Documentation - Get Batch Report</h4>
      <Row>
        <Col>
          <b>Batch Import</b>
          <div>
            <b>
              This API helps to import one or more URLs for web risk analysis.
              An individual case will be created for each URL.
            </b>
          </div>
          <div className="bg-danger text-white text-center p-1 text-decoration-underline my-3">
            <h4>API Documentation</h4>
          </div>
          <div>
            <h2>Web Risk Monitoring API Documentation</h2>
            <p className="fw-semibold">
              <div className="fw-bold">
                Make sure the website URLs provided are in a valid format.
              </div>
              Otherwise, URLs will be rejected or produce inaccurate results.
              Supported URL formats: https://www.example.com
              http://www.example.com
            </p>
          </div>
          <div className="bg-body-secondary p-2">
            <h5>Request Body Parameters</h5>
            <div style={{ fontSize: "12px" }}>
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" className="text-center">
                      Parameter
                    </th>
                    <th scope="col" className="text-center">
                      Type
                    </th>
                    <th scope="col" className="w-100 text-center">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center align-middle">tag</td>
                    <td className="text-center align-middle">String</td>
                    <td className="align-middle">
                      Unique identifier is helpful for tracking web statuses
                      quickly. Eg. Axis Sample batch 7th June 2024
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center align-middle">file</td>
                    <td className="text-center align-middle">csv</td>
                    <td className="align-middle">CSV File</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Col>
        <Col>
          <Card className="my-4">
            <Card.Header className="bg-dark text-white">
              Sample Response
            </Card.Header>
            <div>
              <pre
                className="p-3"
                style={{
                  backgroundColor: "#2d2d2d",
                  color: "#fff",
                  fontFamily: "monospace",
                  overflowX: "auto",
                  overflowY: "scroll",
                  height: "500px",
                  scrollbarWidth: "none" /* For Firefox */,
                  msOverflowStyle: "none",
                }}
              >
                <code>{formatJson(data)}</code>
              </pre>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Documentation;
